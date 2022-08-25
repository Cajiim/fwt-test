import { FC } from 'react';
import { useAppSelector } from '../../hooks/useReduxHooks';
import classNames from 'classnames';
import styles from './paginationPage.scss';
const cn = classNames.bind(styles);

type TPaginationPage = {
  children: JSX.Element;
  disabled: boolean;
  onClick: () => void;
};

const PaginationPage: FC<TPaginationPage> = ({ children, disabled, onClick }) => {
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  return (
    <button
      className={cn('paginationPage', {
        paginationPage_dark: isDarkTheme,
      })}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default PaginationPage;
