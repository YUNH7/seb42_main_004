import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaShoppingBasket as CartIcon } from '@react-icons/all-files/fa/FaShoppingBasket.esm';
import { CartAside, NoContent } from '../components/commons';
import { CartItemLi } from '../components/cartPage';
import { postData } from '../util';

function Cart() {
  const { isLogin } = useSelector((state) => state.authReducer);
  const { mealboxes } = useSelector((state) => state.cartReducer.cart);
  const [checkedBoxes, setCheckedBoxes] = useState(
    mealboxes.map((box) => box.cartMealboxId)
  );
  const navigate = useNavigate();

  const checkedBoxesPrice = mealboxes.reduce(
    (price, box) =>
      checkedBoxes.includes(box.cartMealboxId)
        ? price + box.price * box.quantity
        : price,
    0
  );

  const checkBox = (id) => () => {
    const targetIdx = checkedBoxes.indexOf(id);
    const boxesToChange =
      targetIdx === -1
        ? [...checkedBoxes, id]
        : checkedBoxes.toSpliced(targetIdx, 1);
    setCheckedBoxes(boxesToChange);
  };

  const checkedBox = (id) => checkedBoxes.includes(id);

  const getOrderId = () => {
    if (!isLogin) return navigate('/login');

    const postReqData = mealboxes
      .filter((box) => checkedBoxes.includes(box.cartMealboxId))
      .map((box) => {
        const { cartMealboxId, mealboxId, quantity } = box;
        return { cartMealboxId, mealboxId, quantity };
      });

    postData('/orders', { mealboxes: postReqData }).then((res) => {
      if (res.status === 403) {
        navigate('/email/request');
      } else {
        navigate(res.data, { state: checkedBoxes });
      }
    });
  };

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      {mealboxes.length ? (
        <CartPageContent>
          <CartItemListUl>
            {mealboxes?.map((el) => (
              <CartItemLi
                key={el.cartMealboxId}
                mealbox={el}
                checkBox={checkBox(el.cartMealboxId)}
                isChecked={checkedBox(el.cartMealboxId)}
              />
            ))}
          </CartItemListUl>
          <CartAside totalPrice={checkedBoxesPrice} buttonClick={getOrderId} />
        </CartPageContent>
      ) : (
        <NoContent icon={<CartIcon />} message="장바구니가 비었습니다." />
      )}
    </CartPageWrapper>
  );
}

export default Cart;

const CartPageWrapper = styled.div`
  min-height: calc(100vh - 5rem - 50px);
  flex-direction: column;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CartItemListUl = styled.ul`
  width: 60%;

  > li {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
