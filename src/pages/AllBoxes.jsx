import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BannerLink,
  FilterSearchDiv,
  GetTemplate,
  NoResultDiv,
  Pagination,
} from '../components/commons';
import { BoxCards } from '../components/allboxes';
import { useSortSearch } from '../hooks';

function AllBoxes() {
  const { user, admin } = useSelector((state) => state.authReducer);
  const [
    toFilterSearchDiv,
    searchWord,
    setPage,
    uri,
    mealBoxes,
    pageInfo,
    isPending,
    error,
    getData,
    searchMealBox,
  ] = useSortSearch('/mealboxes/search/detail', '/mealboxes');
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
        <FilterSearchDiv placeholder={searchExample} {...toFilterSearchDiv} />
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
        <BoxCards uri={uri} data={mealBoxes} getData={getData} />
        <Pagination
          page={pageInfo?.page}
          totalpage={pageInfo?.totalPages}
          setPage={setPage}
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
