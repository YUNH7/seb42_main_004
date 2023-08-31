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
import { useFilterSearch, useGET } from '../hooks';

function Custom() {
  const { custom } = useSelector((state) => state.customReducer);
  const { admin } = useSelector((state) => state.authReducer);
  const [path, setPath] = useState('/products?page=1&sort=id&dir=DESC');
  const [res, isPending, error] = useGET(path);
  const [openCustom, setOpenCustom] = useState(false);
  const [toFilterSearchDiv, notFoundWord, setPage] = useFilterSearch(
    false,
    setPath
  );
  const dispatch = useDispatch();

  const totalQuantity = custom.products.reduce((a, c) => a + c.quantity, 0);
  const productsId = custom.products.map((product) => product.productId);

  const productInCustom = (id) => {
    return productsId.indexOf(id);
  };
  const products = openCustom ? custom.products : res?.data;

  useEffect(() => {
    if (products?.length === 0) {
      setOpenCustom(false);
    }
  }, [products]);

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res.data}
      title={`${admin ? '새로운' : '나만의'} 밀박스 만들기`}
    >
      <CustomWrapDiv className="margininside">
        <CustomTitleDiv>
          <h1>{admin && custom ? custom.name : '커스텀 밀박스'}</h1>
          <AsideButtonDiv>
            <TextButton
              inButton={`선택된 목록 ${openCustom ? '닫기' : '보기'}`}
              onClick={() => setOpenCustom(!openCustom)}
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
            <FilterSearchDiv placeholder="고구마" {...toFilterSearchDiv} />
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
                {!openCustom && (
                  <Pagination
                    page={res?.pageInfo?.page}
                    totalpage={res?.pageInfo?.totalPages}
                    setPage={setPage}
                  />
                )}
              </>
            ) : (
              <NoResultDiv
                search={(word) =>
                  setPath(`/products/search?page=1&name=${word}`)
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
  list-style: none;
  margin-bottom: -10px;
`;
