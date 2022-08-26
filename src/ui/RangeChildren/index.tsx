import { FC, useState, memo } from 'react';
import classNames from 'classnames';
import useQueryParams from '../../hooks/useQueryParams';
import styles from './index.scss';
const cn = classNames.bind(styles);

type TChild = {
  valueFilterFrom: (value: string) => void;
  valueFilterBefore: (value: string) => void;
  isDarkTheme: boolean;
};

const RangeChildren: FC<TChild> = ({ valueFilterFrom, valueFilterBefore, isDarkTheme }) => {
  const { queryFilter } = useQueryParams();
  const [valueFrom, setValueFrom] = useState<string>(queryFilter.gte || '');
  const [valueBefore, setValueBefore] = useState<string>(queryFilter.lte || '');
  const handlChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueFilterFrom(e.target.value);
    setValueFrom(e.target.value);
  };
  const handlChangeBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueFilterBefore(e.target.value);
    setValueBefore(e.target.value);
  };

  return (
    <div className="rangeChild">
      <input
        placeholder="from"
        className={cn('rangeChild__input', {
          rangeChild__input_dark: isDarkTheme,
        })}
        onChange={handlChangeFrom}
        value={valueFrom}
        type="number"
      />
      <span
        className={cn('rangeChild__line', {
          rangeChild__line_dark: isDarkTheme,
        })}></span>
      <input
        placeholder="before"
        className={cn('rangeChild__input', {
          rangeChild__input_dark: isDarkTheme,
        })}
        onChange={handlChangeBefore}
        value={valueBefore}
        type="number"
      />
    </div>
  );
};

export default memo(RangeChildren);
