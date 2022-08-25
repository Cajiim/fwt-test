import { FC } from 'react';
import classNames from 'classnames';
import { ReactComponent as DropDown } from '../../assets/dropDown.svg';
import style from './index.scss';

const cn = classNames.bind(style);

type TArrow = {
  isOpen: boolean;
  className?: string;
};

const Arrow: FC<TArrow> = ({ className, isOpen }) => (
  <div
    className={cn('arrow', className, {
      arrow_opened: isOpen,
    })}>
    <DropDown />
  </div>
);

export default Arrow;
