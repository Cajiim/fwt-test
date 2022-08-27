import { FC, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import styles from './index.scss';
import useQueryParams from '../../hooks/useQueryParams';
import { useDebouncedCallback } from 'use-debounce';
const cn = classNames.bind(styles);

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  isDarkTheme: boolean;
  className: string;
};

const Input: FC<TInput> = ({ className, isDarkTheme }) => {
  const { queryFilter, setQueryFilter, deleteQueryFilter } = useQueryParams();
  const [value, setValue] = useState<string>(queryFilter.q || '');
  const debounceSet = useDebouncedCallback(setQueryFilter, 400);
  const debounceDelete = useDebouncedCallback(deleteQueryFilter, 400);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceSet('q', e.target.value.trim());
    if (!e.target.value.length) return debounceDelete('q');
  };

  return (
    <input
      placeholder="Name"
      onChange={onChange}
      className={cn(className, { [`${className}_dark`]: isDarkTheme })}
      value={value.trim()}
    />
  );
};

export default Input;
