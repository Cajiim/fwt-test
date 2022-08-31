import { FC, useEffect, SetStateAction, useCallback } from 'react';
import ActivePagination from './activePagination';
import PaginationPage from './paginationPage';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { setCurrentPage } from '../../redux/reducers/reducerSelects';
import { fetchPaintings } from '../../redux/thunk/fetchDataThunk';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/arrowLeft.svg';
import { ReactComponent as DoubleArrowLeft } from '../../assets/doubleArrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrowRight.svg';
import { ReactComponent as DoubleArrowRight } from '../../assets/doubleArrowRight.svg';
import './index.scss';

const paintingPerPage = 12;

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const { totalCount } = useAppSelector(({ paintings }) => paintings);
  const { dataAuthors, dataLocations, currentPage } = useAppSelector(({ selects }) => selects);
  const [searchParams] = useSearchParams();
  const amount = Math.ceil(totalCount / paintingPerPage);
  const onChange = (number: SetStateAction<number>) => dispatch(setCurrentPage(number));

  const getItems = useCallback(() => {
    let authorId = '';
    let locationId = '';
    dataAuthors.find((el) => (el.name === searchParams.get('author') ? (authorId = el.id) : ''));
    dataLocations.find((el) =>
      el.location === searchParams.get('location') ? (locationId = el.id) : ''
    );
    return { authorId, locationId };
  }, [dataAuthors, dataLocations, searchParams]);

  const setQueryFilter = useCallback(() => {
    return {
      q: searchParams.get('q') || '',
      author: getItems().authorId,
      location: getItems().locationId,
      gte: searchParams.get('created_gte') || '',
      lte: searchParams.get('created_lte') || '',
      page: currentPage,
      limit: paintingPerPage,
    };
  }, [currentPage, getItems, searchParams]);

  useEffect(() => {
    dispatch(fetchPaintings(setQueryFilter()));
  }, [dispatch, setQueryFilter]);

  return (
    <div className="pagination">
      <PaginationPage onClick={() => onChange(1)} disabled={currentPage < 2}>
        <DoubleArrowLeft className="pagination__doubleArrow" />
      </PaginationPage>
      <PaginationPage onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowLeft className="pagination__arrow" />
      </PaginationPage>
      <ActivePagination onChange={onChange} currentPage={currentPage} amount={amount} />
      <PaginationPage onClick={() => onChange(currentPage + 1)} disabled={currentPage >= amount}>
        <ArrowRight className="pagination__arrow" />
      </PaginationPage>
      <PaginationPage onClick={() => onChange(amount)} disabled={currentPage >= amount}>
        <DoubleArrowRight className="pagination__doubleArrow" />
      </PaginationPage>
    </div>
  );
};

export default Pagination;
