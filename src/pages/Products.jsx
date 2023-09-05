import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FilterSearchDiv,
  GetTemplate,
  NoResultDiv,
  Pagination,
} from '../components/commons';
import { MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import { ProductCards } from '../components/product';
import { useFilterSearch, useGET } from '../hooks';

function Products() {
  const { admin } = useSelector((state) => state.authReducer);
  const [toFilterSearchDiv, notFoundWord, setPage, uri] =
    useFilterSearch(false);

  const [res, isPending, error, getData] = useGET(uri);
  const navigate = useNavigate();

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res?.data}
      title="구성품 목록 보기"
    >
      <MealBoxesWrapDiv className="margininside">
        <h1>구성품 설명</h1>
        <FilterSearchDiv placeholder="고구마" {...toFilterSearchDiv} />
        {notFoundWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {res.data?.length === 0 && (
          <NoResultDiv
            search={(word) => navigate(`/products/search?page=1&name=${word}`)}
            notFoundWord={notFoundWord}
            replaceWord={'단백질쉐이크'}
          />
        )}
        <ProductCards
          admin={admin}
          uri={uri}
          data={res.data}
          getData={getData}
        />
        <Pagination
          page={res?.pageInfo?.page}
          totalpage={res?.pageInfo?.totalPages}
          setPage={setPage}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default Products;
