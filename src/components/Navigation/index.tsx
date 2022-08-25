import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import useQueryParams from '../../hooks/useQueryParams';
import { fetchAuthors, fetchLocations } from '../../redux/thunk/fetchDataThunk';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Range from '../../ui/Range';
import './index.scss';

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const { dataLocations, dataAuthors } = useAppSelector(({ selects }) => selects);
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  const { setQueryFilter } = useQueryParams();

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <nav className="navigation">
      <Input isDarkTheme={isDarkTheme} className="inputName" />
      <Select
        isDarkTheme={isDarkTheme}
        value={'Author'}
        data={dataAuthors}
        onChange={(value: string) => setQueryFilter('author', value)}
      />
      <Select
        isDarkTheme={isDarkTheme}
        value={'Location'}
        data={dataLocations}
        onChange={(value: string) => setQueryFilter('location', value)}
      />
      <Range isDarkTheme={isDarkTheme} />
    </nav>
  );
};

export default Navigation;
