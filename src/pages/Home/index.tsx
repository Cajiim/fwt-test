import { FC, useEffect } from 'react';
import Content from '../../components/Content';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { useAppSelector } from '../../hooks/useReduxHooks';
import Pagination from '../../ui/Pagination';
import './index.scss';

const Home: FC = () => {
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  useEffect(() => {
    const theme = isDarkTheme
      ? document.body.classList.add('darkTheme')
      : document.body.classList.remove('darkTheme');
    return () => theme;
  });
  return (
    <div className="home-wrapper">
      <header className="home-wrapper__header">
        <Header />
      </header>
      <main className="home-wrapper__main">
        <Navigation />
        <Content />
        <Pagination />
      </main>
    </div>
  );
};

export default Home;
