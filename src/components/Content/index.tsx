import { FC } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/useReduxHooks';
import Loader from '../Loader';
import PaintingCard from '../PaintingCard';
import type { TCard } from '../../types';
import styles from './index.scss';
const cn = classNames.bind(styles);

const Content: FC<TCard> = () => {
  const { isDarkTheme } = useAppSelector(({ theme }) => theme);
  const { dataPaintings, isLoading } = useAppSelector(({ paintings }) => paintings);
  return (
    <>
      {!isLoading ? (
        <ul className="content">
          {dataPaintings.map((card) => (
            <PaintingCard card={card} key={card.id} />
          ))}
        </ul>
      ) : (
        <Loader />
      )}
      {!isLoading && dataPaintings.length === 0 && (
        <p
          className={cn('content__error', {
            content__error_dark: isDarkTheme,
          })}>
          По вашему запросу ничего не найдено
        </p>
      )}
    </>
  );
};

export default Content;
