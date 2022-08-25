import { FC, useState, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import Arrow from '../Arrow';
import { ReactComponent as ClearSelect } from '../../assets/close.svg';
import useQueryParams from '../../hooks/useQueryParams';
import useOutsideClick from '../../hooks/useOutsideClick';
import { TSelectItem } from '../../types';
import styles from './index.scss';
import './simpleBar.scss';
const cn = classNames.bind(styles);

type TSelect = {
  isDarkTheme: boolean;
  value: string;
  data: TSelectItem[];
  onChange: (value: string) => void;
};

const Select: FC<TSelect> = ({ isDarkTheme, value, data, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { queryFilter, deleteQueryFilter } = useQueryParams();
  const [selectValue, setSelectValue] = useState<string>(
    value === 'Author' ? queryFilter.author || value : queryFilter.location || value
  );
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
      <span className="select__name">{selectValue}</span>
      <div
        className={cn('select__clear', {
          select__clear_hidden: selectValue === 'Author' || selectValue === 'Location',
        })}
        onClick={(e) => {
          e.stopPropagation();
          deleteQueryFilter(value.toLowerCase());
          setSelectValue(value);
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
                  onChange(el.name || el.location);
                  setSelectValue(el.name || el.location);
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

export default Select;
