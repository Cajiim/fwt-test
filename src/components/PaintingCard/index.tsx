import { FC, memo } from 'react';
import { baseURL } from '../../api/api';
import './index.scss';

type TCard = {
  card: {
    author: {
      name: string;
    };
    created: string;
    id: number;
    imageUrl: string;
    location: {
      location: string;
    };
    name: string;
  };
};

const PaintingCard: FC<TCard> = ({ card }) => {
  const { imageUrl, name, author, created, location } = card;
  return (
    <li className="painting">
      <img src={`${baseURL}${imageUrl}`} className="painting__img" alt="Painting"></img>
      <div className="painting__information">
        <p className="painting__name">{name}</p>
        <div>
          <p className="painting__author">
            Author:
            <span className="painting__authorName"> {author.name}</span>
          </p>
          <p className="painting__created">
            Created:
            <span className="painting__createdYear">{created}</span>
          </p>
          <p className="painting__location">
            Location:
            <span className="painting__locationName">{location.location}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(PaintingCard);
