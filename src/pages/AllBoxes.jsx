import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BannerLink,
  GetTemplate,
  NoResultDiv,
  Pagination,
  SortSearch,
} from '../components/commons';
import { BoxCards } from '../components/allboxes';
import { useSortSearch } from '../hooks';

function AllBoxes() {
  const { user, admin } = useSelector((state) => state.authReducer);
  const {
    sortSearch,
    changePage,
    data: mealBoxes,
    pageInfo,
    isPending,
    error,
    getData,
    sortedFirstPage,
  } = useSortSearch('/mealboxes/search/detail', '/mealboxes');
  const { searchWord, searchSubject: searchMealBox } = sortSearch;
  const searchExample = '고단백질 아침 세트';

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={mealBoxes}
      title="밀박스 목록 보기"
    >
      <MealBoxesWrapDiv className="margininside">
        {!admin && <BannerLink />}
        <h1>
          {user?.name && `${user.name}님 `}오늘도 건강한 하루되세요(｡•̀ᴗ-)✧
        </h1>
        <SortSearch placeholder={searchExample} {...sortSearch} />
        {searchWord && (
          <SearchResultH3>
            검색결과 {pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {mealBoxes?.length === 0 && (
          <NoResultDiv
            search={() => searchMealBox(searchExample)}
            searchWord={searchWord}
            replaceWord={searchExample}
          />
        )}
        <BoxCards
          sortedFirstPage={sortedFirstPage}
          data={mealBoxes}
          getData={getData}
        />
        <Pagination
          page={pageInfo?.page}
          totalpage={pageInfo?.totalPages}
          setPage={changePage}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default AllBoxes;

export const MealBoxesWrapDiv = styled.div`
  flex-direction: column;
`;
export const SearchResultH3 = styled.h3`
  margin-bottom: 0.5rem;
`;
