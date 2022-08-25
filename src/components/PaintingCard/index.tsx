import { FC, memo } from 'react';
import { TCard } from '../../types';
import { baseURL } from '../../api/api';
import './index.scss';

const PaintingCard: FC<TCard> = ({ card }) => {
  return (
    <li className="painting">
      <img src={`${baseURL}${card?.imageUrl}`} className="painting__img" alt="Painting"></img>
      <div className="painting__information">
        <p className="painting__name">{card?.name}</p>
        <div>
          <p className="painting__author">
            Author:
            <span className="painting__authorName"> {card?.author?.name}</span>
          </p>
          <p className="painting__created">
            Created:
            <span className="painting__createdYear">{card?.created}</span>
          </p>
          <p className="painting__location">
            Location:
            <span className="painting__locationName">{card?.location?.location}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default memo(PaintingCard);
