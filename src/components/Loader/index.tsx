import { FC } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/useReduxHooks';
import styles from './index.scss';
const cn = classNames.bind(styles);

const Loader: FC = () => {
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  return (
    <div className="loader">
      <p
        className={cn('loader__text', {
          loader__text_dark: isDarkTheme,
        })}>
        Loading...
      </p>
      <div
        className={cn('lds-roller', {
          'lds-roller_dark': isDarkTheme,
        })}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
