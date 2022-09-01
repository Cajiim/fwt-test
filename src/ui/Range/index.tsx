import { FC, useState, useRef } from 'react';
import classNames from 'classnames';
import Arrow from '../Arrow';
import RangeChildren from '../RangeChildren';
import useQueryParams from '../../hooks/useQueryParams';
import { useDebouncedCallback } from 'use-debounce';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppDispatch } from '../../hooks/useReduxHooks';
import { restorePage } from '../../redux/reducers/reducerSelects';
import styles from './index.scss';
const cn = classNames.bind(styles);

type TRange = { isDarkTheme: boolean };

const Range: FC<TRange> = ({ isDarkTheme }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setQueryFilter, deleteQueryFilter } = useQueryParams();
  const debounceSet = useDebouncedCallback(setQueryFilter, 400);
  const debounceDelete = useDebouncedCallback(deleteQueryFilter, 400);
  const debounceDispatch = useDebouncedCallback(dispatch, 400);
  const valueFilterFrom = (value: string) => {
    if (value) debounceSet('created_gte', value);
    if (!value.length) debounceDelete('created_gte');
    debounceDispatch(restorePage());
  };
  const valueFilterBefore = (value: string) => {
    if (value) debounceSet('created_lte', value);
    if (!value.length) debounceDelete('created_lte');
    debounceDispatch(restorePage());
  };
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen(!isOpen);
  useOutsideClick(ref, toggleOpen);

  return (
    <div
      ref={isOpen ? ref : null}
      className={cn('range', {
        range_open: isOpen,
        range_dark: isDarkTheme,
        range_activeDark: isOpen && isDarkTheme,
      })}
      aria-hidden="true"
      onClick={() => setIsOpen(!isOpen)}>
      <span className={cn('range__title', { range__title_dark: isDarkTheme })}>Created</span>
      <Arrow
        className={cn('range__arrow', {
          range__arrow_dark: isDarkTheme,
        })}
        isOpen={isOpen}
      />
      {isOpen && (
        <div
          className={cn('range__сontainer', {
            range__сontainer_active: isOpen,
            range__сontainer_dark: isDarkTheme,
          })}
          aria-hidden="true"
          onClick={(e) => e.stopPropagation()}>
          <RangeChildren
            valueFilterFrom={valueFilterFrom}
            valueFilterBefore={valueFilterBefore}
            isDarkTheme={isDarkTheme}
          />
        </div>
      )}
    </div>
  );
};

export default Range;
