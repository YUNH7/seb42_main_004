import { useSelector } from 'react-redux';
import {
  FilterSearchDiv,
  GetTemplate,
  NoResultDiv,
  Pagination,
} from '../components/commons';
import { MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import { ProductCards } from '../components/product';
import { useSortSearch } from '../hooks';

function Products() {
  const { admin } = useSelector((state) => state.authReducer);
  const [
    toFilterSearchDiv,
    searchWord,
    setPage,
    uri,
    products,
    pageInfo,
    isPending,
    error,
    getData,
    searchProduct,
  ] = useSortSearch('/products/search', '/products');
  const searchExample = '단백질쉐이크';

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={products}
      title="구성품 목록 보기"
    >
      <MealBoxesWrapDiv className="margininside">
        <h1>구성품 설명</h1>
        <FilterSearchDiv placeholder={searchExample} {...toFilterSearchDiv} />
        {searchWord && (
          <SearchResultH3>
            검색결과 {pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {products?.length === 0 && (
          <NoResultDiv
            search={() => searchProduct(searchExample)}
            searchWord={searchWord}
            replaceWord={searchExample}
          />
        )}
        <ProductCards
          admin={admin}
          uri={uri}
          data={products}
          getData={getData}
        />
        <Pagination
          page={pageInfo?.page}
          totalpage={pageInfo?.totalPages}
          setPage={setPage}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default Products;
