export type TCard = {
  card?: {
    author?: {
      name?: string;
    };
    created?: string;
    id?: number;
    imageUrl?: string;
    location?: {
      location?: string;
    };
    name?: string;
  };
};

export type TFilter = {
  q?: string;
  author?: string;
  location?: string;
  gte?: string;
  lte?: string;
  page?: number;
  limit?: number;
};

export type TFilterParamsObj = {
  q?: string;
  authorId?: string;
  locationId?: string;
  created_gte?: string;
  created_lte?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
};

export type TSelectItem = {
  id: string;
  name: string;
  location: string;
};
