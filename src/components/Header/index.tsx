import { FC } from 'react';
import classNames from 'classnames';
import { changeTheme } from '../../redux/reducers/reducerTheme';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks';
import { ReactComponent as Logo } from '../../assets/fwt-logo.svg';
import { ReactComponent as ThemeIcon } from '../../assets/themeIcon.svg';
import styles from './index.scss';
const cn = classNames.bind(styles);

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  return (
    <header className="header">
      <Logo className="header__logo" />
      <ThemeIcon
        className={cn('header__themeIcon', {
          header__themeIcon_dark: isDarkTheme,
        })}
        onClick={() => dispatch(changeTheme())}
      />
    </header>
  );
};

export default Header;
