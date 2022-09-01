import { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.scss';
import useQueryParams from '../../hooks/useQueryParams';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '../../hooks/useReduxHooks';
import { restorePage } from '../../redux/reducers/reducerSelects';
const cn = classNames.bind(styles);

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  isDarkTheme: boolean;
  className: string;
};

const Input: FC<TInput> = ({ className, isDarkTheme }) => {
  const dispatch = useAppDispatch();
  const { queryFilter, setQueryFilter, deleteQueryFilter } = useQueryParams();
  const [value, setValue] = useState<string>(queryFilter.q || '');
  const debounceSet = useDebouncedCallback(setQueryFilter, 400);
  const debounceDelete = useDebouncedCallback(deleteQueryFilter, 400);
  const debounceDispatch = useDebouncedCallback(dispatch, 400);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceSet('q', e.target.value.trim());
    if (!e.target.value.length) return debounceDelete('q');
    debounceDispatch(restorePage());
  };

  useEffect(() => {
    if (!queryFilter.q) {
      setValue('');
    }
  }, [queryFilter.q]);

  return (
    <input
      placeholder="Name"
      onChange={onChange}
      className={cn(className, { [`${className}_dark`]: isDarkTheme })}
      value={value}
    />
  );
};

export default Input;
