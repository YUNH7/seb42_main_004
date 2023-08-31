import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { TextButton } from '../commons';
import { deleteProduct, setProduct } from '../../reducers/customReducer';
import { logo_black } from '../../assets';

function BoxElementCardLi({ product, quantity, totalQuantity }) {
  quantity = quantity || 0;
  const dispatch = useDispatch();

  const cardClick = () => {
    if (quantity === 0)
      dispatch(setProduct({ ...product, quantity: quantity + 1 }));
    else if (quantity === 1) dispatch(deleteProduct(product.productId));
  };

  const changeQuantity = (key) => () => {
    if (key === 'minus' && quantity < 1) return;
    else if (key === 'plus' && totalQuantity >= 10)
      return alert('구성품은 10개까지 추가할 수 있습니다');

    const payload = { ...product };
    payload.quantity = key === 'minus' ? quantity - 1 : quantity + 1;
    dispatch(setProduct(payload));
  };

  return (
    <ProductContainerLi
      onClick={cardClick}
      className="shadow"
      quantity={quantity}
    >
      <ProductImg
        alt=""
        src={product.imagePath ? product.imagePath : logo_black}
      />
      <ProductInfoDiv>
        <h3>{product.name}</h3>
        <ProductDetailDiv>
          <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
          <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
          <span>{product.price.toLocaleString('ko-KR')}원</span>
        </ProductDetailDiv>
      </ProductInfoDiv>
      <div
        role="button"
        tabIndex={0}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <TextButton
          inButton="-"
          onClick={changeQuantity('minus')}
          padding="0.5rem"
          fs="1.3rem"
          font="basic"
        />
        <ProductQuantitySpan>{quantity}</ProductQuantitySpan>
        <TextButton
          inButton="+"
          onClick={changeQuantity('plus')}
          padding="0.5rem"
          fs="1.3rem"
          font="basic"
        />
      </div>
    </ProductContainerLi>
  );
}

export default BoxElementCardLi;

const ProductContainerLi = styled.li`
  width: 100%;
  display: flex;
  border-radius: 4px;
  flex-direction: row;
  padding: 5px 1.5rem;
  padding-right: 1.5rem;
  margin-bottom: 10px;
  background-color: var(
    ${(props) => (props.quantity ? '--bucket_brown' : '--product_cocoa')}
  );
  align-items: center;
  justify-content: space-between;
`;
const ProductImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  align-self: center;
`;
const ProductInfoDiv = styled.div`
  flex: 1;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > h3 {
    word-break: keep-all;
    margin-right: 8px;
  }
`;
const ProductDetailDiv = styled.div`
  display: flex;

  > span {
    margin-right: 8px;
    font-size: 0.8rem;
    word-break: keep-all;
  }
`;
const ProductQuantitySpan = styled.span`
  font-weight: bold;
  margin: 4px;
  font-size: 1.3rem;
`;
