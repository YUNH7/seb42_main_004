import { useState } from 'react';
import styled from 'styled-components';
import { ModalDiv, TextButton } from '../commons';
import { MealBoxImg, MealBoxImgDiv } from '../allboxes/MealBoxCardLi';
import { useDeleteSubject } from '../../hooks';
import { blankbucket, logo_black } from '../../assets';

function ProductLi({ product, admin, reload }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteSubject = useDeleteSubject('products');

  return (
    <ContainerLi
      margin={!admin && 1}
      className="shadow"
      onClick={!product ? () => setOpenModal(true) : null}
    >
      {openModal && (
        <ModalDiv
          reload={reload}
          product={product}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <MealBoxImgDiv>
        <ProductImg
          src={
            product
              ? product?.imagePath
                ? product.imagePath
                : logo_black
              : blankbucket
          }
          alt=""
        />
      </MealBoxImgDiv>
      <ProductInfoDiv margin={!admin && 1}>
        <h3>{product ? product.name : '구성품 추가하기'}</h3>
        {product && (
          <>
            <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
            <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
            <span>{product.price.toLocaleString('ko-KR')}원</span>
          </>
        )}
      </ProductInfoDiv>
      {admin && product && (
        <ButtonDiv>
          <TextButton
            inButton="수정"
            onClick={() => setOpenModal(true)}
            font="basic"
            hover="none"
          />
          <TextButton
            inButton="삭제"
            onClick={() =>
              deleteSubject(product.name, product.productId, reload)
            }
            font="basic"
            hover="none"
          />
        </ButtonDiv>
      )}
    </ContainerLi>
  );
}

export default ProductLi;

const ContainerLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--white);
  padding-bottom: ${(props) => props.margin && '2rem'};
`;
const ProductImg = styled(MealBoxImg)`
  padding: 10%;
`;
const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
