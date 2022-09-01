import axios from 'axios';
import type { TFilter, TFilterParamsObj } from '../types';

export const baseURL = process.env.REACT_APP_API_BASE_ADDRESS;
const instance = axios.create({ baseURL });

const expand = '?_expand=author&_expand=location';
export const getPaintings = (urlFilter: TFilter) => {
  const paramsObj: TFilterParamsObj = {};
  const { q, author, location, gte, lte, page, limit } = urlFilter;
  if (q) paramsObj.q = q;
  if (author) paramsObj.authorId = author;
  if (location) paramsObj.locationId = location;
  if (gte) paramsObj.created_gte = gte;
  if (lte) paramsObj.created_lte = lte;
  if (page) paramsObj._page = page;
  if (limit) paramsObj._limit = limit;
  paramsObj._sort = 'name';
  return instance.get(`/paintings${expand}`, {
    params: paramsObj,
  });
};

export const getLocations = () =>
  instance.get('/locations', {
    params: {
      _sort: 'location',
    },
  });

export const getAuthors = () =>
  instance.get('/authors', {
    params: {
      _sort: 'name',
    },
  });
