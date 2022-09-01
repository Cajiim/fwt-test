import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { fetchAuthors, fetchLocations } from '../../redux/thunk/fetchDataThunk';
import { useSearchParams } from 'react-router-dom';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Range from '../../ui/Range';
import './index.scss';

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const { dataLocations, dataAuthors } = useAppSelector(({ selects }) => selects);
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  const [searchParams] = useSearchParams();
  const paramsAuthor = searchParams.get('author');
  const paramsLocation = searchParams.get('location');

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <nav className="navigation">
      <Input isDarkTheme={isDarkTheme} className="inputName" />
      <Select isDarkTheme={isDarkTheme} value={'Author'} data={dataAuthors} params={paramsAuthor} />
      <Select
        isDarkTheme={isDarkTheme}
        value={'Location'}
        data={dataLocations}
        params={paramsLocation}
      />
      <Range isDarkTheme={isDarkTheme} />
    </nav>
  );
};

export default Navigation;
