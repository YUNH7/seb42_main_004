import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function CartCounter() {
  let { mealboxes } = useSelector((state) => state.cartReducer.cart) || {
    mealboxes: [],
  };

  let [count, setCount] = useState(0);

  useEffect(() => {
    setCount(mealboxes?.length);
  }, [mealboxes]);

  return (
    <Round>
      <Count>{count}</Count>
    </Round>
  );
}

export default CartCounter;

const Round = styled.div`
  position: absolute;
  top: 18px;
  right: -7px;
  width: 17px;
  height: 17px;
  background-color: red;
  border-radius: 100%;
`;

const Count = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--white);
`;
