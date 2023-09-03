import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaShoppingCart as CartIcon } from '@react-icons/all-files/fa/FaShoppingCart.esm';

function ToCart() {
  const { mealboxes } = useSelector((state) => state.cartReducer.cart);

  return (
    <Wrapper to="/cart">
      <CartIcon size={25} />
      <Counter>{mealboxes.length}</Counter>
    </Wrapper>
  );
}

export default ToCart;

const Wrapper = styled(Link)`
  position: relative;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Counter = styled.div`
  position: absolute;
  top: 7px;
  right: 6px;
  width: 17px;
  height: 17px;
  background-color: red;
  border-radius: 100%;
  text-align: center;
  line-height: 17px;
  font-family: var(--f_hard);
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--white);
`;
