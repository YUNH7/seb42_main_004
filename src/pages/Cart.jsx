import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaShoppingBasket as CartIcon } from '@react-icons/all-files/fa/FaShoppingBasket.esm';
import { CartAside, NoContent } from '../components/commons';
import { CartItemLi } from '../components/cartPage';
import { setCart } from '../reducers/cartReducer';
import { getData, postData } from '../util';

function Cart() {
  const { isLogin } = useSelector((state) => state.authReducer);
  const { totalPrice, mealboxes } = useSelector(
    (state) => state.cartReducer.cart
  ) || { totalPrice: 0, mealboxes: [] };
  const [renderPrice, setRenderPrice] = useState(totalPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calcRenderPrice = () => {
    const checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkedCartMealBoxId = [...checkedItem].map((el) => String(el.id));

    const checkedPrice = mealboxes?.reduce((acc, cur) => {
      return checkedCartMealBoxId.includes(String(cur.cartMealboxId))
        ? acc + cur.price * cur.quantity
        : acc;
    }, 0);

    setRenderPrice(checkedPrice);
  };

  const purchaseHandler = () => {
    if (!isLogin) return navigate('/login');

    const checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkedCartMealBoxId = [...checkedItem].map((el) => String(el.id));

    const postReqData = mealboxes
      .filter((el) => checkedCartMealBoxId.includes(String(el.cartMealboxId)))
      .map((el) => {
        const { cartMealboxId, mealboxId, quantity } = el;
        return { cartMealboxId, mealboxId, quantity };
      });

    postData('/orders', { mealboxes: postReqData }).then((res) => {
      if (res.status === 403) {
        navigate('/email/request');
      } else {
        navigate(res.data, { state: checkedCartMealBoxId });
      }
    });
  };

  useEffect(() => {
    calcRenderPrice();
  }, [mealboxes]);

  useEffect(() => {
    isLogin &&
      getData('/users/cart').then((res) => {
        dispatch(setCart(res.data));
      });
  }, []);

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      {totalPrice ? (
        <CartPageContent>
          <CartItemListUl>
            {mealboxes?.map((el) => (
              <CartItemLi
                key={el.cartMealboxId}
                mealbox={el}
                value={el.cartMealboxId}
                calcRenderPrice={calcRenderPrice}
              />
            ))}
          </CartItemListUl>
          <CartAside totalPrice={renderPrice} buttonClick={purchaseHandler} />
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
