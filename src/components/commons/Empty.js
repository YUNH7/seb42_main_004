import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingBasket } from '@react-icons/all-files/fa/FaShoppingBasket.esm';
import { GoNote } from '@react-icons/all-files/go/GoNote.esm';

function Empty() {
  let { pathname } = useLocation();

  return (
    <CartEmptyDiv>
      {pathname === '/cart' ? <FaShoppingBasket /> : <GoNote />}
      <Text>
        {pathname === '/cart'
          ? '장바구니가 비었습니다.'
          : '주문내역이 없습니다.'}
      </Text>
    </CartEmptyDiv>
  );
}

export default Empty;

const CartEmptyDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 200px;
    height: 200px;
  }
`;

const Text = styled.div`
  font-size: large;
  margin-top: 10px;
`;
