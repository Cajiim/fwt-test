import { FC, useState, useRef, memo, useCallback } from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import Arrow from '../Arrow';
import { ReactComponent as ClearSelect } from '../../assets/close.svg';
import useQueryParams from '../../hooks/useQueryParams';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { useSearchParams } from 'react-router-dom';
import { restorePage } from '../../redux/reducers/reducerSelects';
import type { TSelectItem } from '../../types';
import styles from './index.scss';
import './simpleBar.scss';
const cn = classNames.bind(styles);

type TSelect = {
  isDarkTheme: boolean;
  value: string;
  data: TSelectItem[];
  params: string | null;
};

const Select: FC<TSelect> = ({ isDarkTheme, value, data, params }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteQueryFilter, setQueryFilter } = useQueryParams();
  const { dataLocations, dataAuthors } = useAppSelector(({ selects }) => selects);
  const [searchParams] = useSearchParams();

  const getItems = useCallback(() => {
    let author = 'Author';
    let location = 'Location';
    dataAuthors.find((el) => (el.id == searchParams.get('author') ? (author = el.name) : ''));
    dataLocations.find((el) =>
      el.id == searchParams.get('location') ? (location = el.location) : ''
    );
    return { author, location };
  }, [dataAuthors, dataLocations, searchParams]);
  const selectContent =
    value === 'Author' ? getItems().author || value : getItems().location || value;

  const ref = useRef(null);
  const toggleOpen = () => setIsOpen(!isOpen);
  useOutsideClick(ref, toggleOpen);

  return (
    <div
      ref={isOpen ? ref : null}
      className={cn('select', {
        select_dark: isDarkTheme,
        select_open: isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
      aria-hidden="true">
      <span className="select__name">{selectContent}</span>
      <div
        className={cn('select__clear', {
          select__clear_hidden: params == null,
        })}
        onClick={(e) => {
          e.stopPropagation();
          deleteQueryFilter(value.toLowerCase());
        }}
        aria-hidden="true">
        <ClearSelect
          className={cn('select__clearIcon', {
            select__clearIcon_dark: isDarkTheme,
          })}
        />
      </div>
      <Arrow
        className={cn('select__dropDown', {
          select__dropDown_dark: isDarkTheme,
        })}
        isOpen={isOpen}
      />
      {isOpen && data && (
        <ul
          className={cn('select__list', {
            select__list_dark: isDarkTheme,
            select__list_open: isOpen,
          })}>
          <SimpleBar style={{ maxHeight: 'inherit' }}>
            {data.map((el) => (
              <li
                className={cn('select__items', {
                  select__items_dark: isDarkTheme,
                })}
                onClick={() => {
                  dispatch(restorePage());
                  if (el.name) {
                    setQueryFilter('author', el.id);
                  }
                  if (el.location) {
                    setQueryFilter('location', el.id);
                  }
                }}
                key={el.id}
                aria-hidden="true">
                <p className="select__itemsName">{el.name || el.location}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default memo(Select);
