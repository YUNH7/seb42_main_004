import styled from 'styled-components';
import MealBoxCardLi from './MealBoxCardLi';

function BoxCards({ uri, data, getData }) {
  const filteredFirstPage = uri.includes('?page=1&') && !uri.includes('search');
  const noData = data?.length === 0;
  const hasData = data?.length !== 0;

  return (
    <Cards>
      {(filteredFirstPage || noData) && <MealBoxCardLi />}
      {hasData &&
        data.map((mealbox) => (
          <MealBoxCardLi
            key={mealbox.mealboxId}
            mealBox={mealbox}
            reload={getData}
          />
        ))}
    </Cards>
  );
}

export default BoxCards;

export const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 4vw;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 2rem;
  }
`;
