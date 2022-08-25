import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/useReduxHooks';
import styles from './activePagination.scss';
const cn = classNames.bind(styles);

type TActivPage = {
  currentPage: number;
  amount: number;
  onChange: (number: number) => void;
};

const ActivePagination: FC<TActivPage> = ({ currentPage, amount, onChange }) => {
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  const amountPage = useMemo(() => Array.from({ length: amount }, (_, i) => i + 1), [amount]);
  const pageNumbers = useMemo(() => {
    if (currentPage <= 1) return amountPage.slice(0, 3);
    if (currentPage >= amountPage.length) return amountPage.slice(-3);

    const start = currentPage <= 2 ? 0 : currentPage - 2;
    const end = currentPage >= amountPage.length - 1 ? amountPage.length : currentPage + 1;

    return amountPage.slice(start, end);
  }, [amountPage, currentPage]);

  return (
    <>
      {pageNumbers.map((el) => (
        <button
          type="button"
          className={cn('button', {
            button_active: el === currentPage,
            button_dark: isDarkTheme,
            button_activeDark: el === currentPage && isDarkTheme,
          })}
          key={el}
          onClick={() => onChange(el)}>
          {el}
        </button>
      ))}
    </>
  );
};

export default ActivePagination;
