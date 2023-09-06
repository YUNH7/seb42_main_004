import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  FilterSearchDiv,
  GetTemplate,
  TextButton,
  NoResultDiv,
  Pagination,
} from '../components/commons';
import { BoxElementCardLi, CustomAside } from '../components/custom';
import { MealBoxesWrapDiv } from './AllBoxes';
import { initializeCustom } from '../reducers/customReducer';
import { useSortSearch } from '../hooks';

function Custom() {
  const { custom } = useSelector((state) => state.customReducer);
  const { admin } = useSelector((state) => state.authReducer);
  const [showSelected, setShowSelected] = useState(false);
  const [
    toFilterSearchDiv,
    notFoundWord,
    setPage,
    ,
    data,
    pageInfo,
    isPending,
    error,
    ,
    searchKeyWord,
  ] = useSortSearch('/products/search', '/products', true);
  const dispatch = useDispatch();

  const totalQuantity = custom.products.reduce((a, c) => a + c.quantity, 0);
  const productsId = custom.products.map((product) => product.productId);

  const productInCustom = (id) => productsId.indexOf(id);
  const handleShowSelected = () => setShowSelected(!showSelected);
  const products = showSelected ? custom.products : data;

  useEffect(() => {
    if (products?.length === 0) {
      setShowSelected(false);
    }
  }, [products]);

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={data}
      title={`${admin ? '새로운' : '나만의'} 밀박스 만들기`}
    >
      <CustomWrapDiv className="margininside">
        <CustomTitleDiv>
          <h1>{admin && custom ? custom.name : '커스텀 밀박스'}</h1>
          <AsideButtonDiv>
            <TextButton
              inButton={`선택된 목록 ${showSelected ? '닫기' : '보기'}`}
              onClick={handleShowSelected}
              font="basic"
            />
            <TextButton
              inButton="다시 담기"
              onClick={() => dispatch(initializeCustom())}
              font="basic"
            />
          </AsideButtonDiv>
        </CustomTitleDiv>
        <CustomSelectDiv>
          <ElementsContainerDiv>
            <FilterSearchDiv
              placeholder="단백질쉐이크"
              {...toFilterSearchDiv}
            />
            {products?.length !== 0 ? (
              <>
                <BoxElementCardUl>
                  {products?.map((product) => (
                    <BoxElementCardLi
                      key={product.productId}
                      product={product}
                      quantity={
                        custom.products[productInCustom(product.productId)]
                          ?.quantity
                      }
                      totalQuantity={totalQuantity}
                    />
                  ))}
                </BoxElementCardUl>
                {!showSelected && (
                  <Pagination
                    page={pageInfo?.page}
                    totalpage={pageInfo?.totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            ) : (
              <NoResultDiv
                search={(word) =>
                  searchKeyWord(`/products/search?page=1&name=${word}`)
                }
                notFoundWord={notFoundWord}
                replaceWord={'단백질쉐이크'}
              />
            )}
          </ElementsContainerDiv>
          <CustomAside custom={custom} />
        </CustomSelectDiv>
      </CustomWrapDiv>
    </GetTemplate>
  );
}

export default Custom;

const CustomWrapDiv = styled(MealBoxesWrapDiv)`
  position: relative;
`;
const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CustomTitleDiv = styled(CustomSelectDiv)`
  align-items: flex-end;
`;
const AsideButtonDiv = styled(CustomSelectDiv)`
  min-width: 30%;
`;
const ElementsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  min-width: 60%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const BoxElementCardUl = styled.ul`
  margin-bottom: -10px;
`;
