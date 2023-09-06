import { useSelector } from 'react-redux';
import {
  GetTemplate,
  NoResultDiv,
  Pagination,
  SortSearch,
} from '../components/commons';
import { MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import { ProductCards } from '../components/product';
import { useSortSearch } from '../hooks';

function Products() {
  const { admin } = useSelector((state) => state.authReducer);
  const {
    sortSearch,
    changePage,
    data: products,
    pageInfo,
    isPending,
    error,
    getData,
    sortedFirstPage,
  } = useSortSearch('/products/search', '/products');
  const { searchWord, searchSubject: searchProduct } = sortSearch;
  const searchExample = '단백질쉐이크';

  return (
    <MealBoxesWrapDiv className="margininside">
      <h1>구성품 설명</h1>
      <SortSearch placeholder={searchExample} {...sortSearch} />
      <GetTemplate
        isPending={isPending}
        error={error}
        res={products}
        title="구성품 목록 보기"
      >
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
          sortedFirstPage={sortedFirstPage}
          data={products}
          getData={getData}
        />
        <Pagination
          page={pageInfo?.page}
          totalpage={pageInfo?.totalPages}
          setPage={changePage}
        />
      </GetTemplate>
    </MealBoxesWrapDiv>
  );
}

export default Products;
