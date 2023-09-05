import { useNavigate } from 'react-router-dom';
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
import { useFilterSearch } from '../hooks';

function AllBoxes() {
  const { user, admin } = useSelector((state) => state.authReducer);
  const [
    toFilterSearchDiv,
    notFoundWord,
    setPage,
    uri,
    mealBoxes,
    pageInfo,
    isPending,
    error,
    getData,
  ] = useFilterSearch('', '/mealboxes/search/detail', '/mealboxes');
  const navigate = useNavigate();

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
        <FilterSearchDiv
          placeholder="healthy day 밀박스"
          {...toFilterSearchDiv}
        />
        {notFoundWord && (
          <SearchResultH3>
            검색결과 {pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {mealBoxes?.length === 0 && (
          <NoResultDiv
            search={(word) =>
              navigate(`/mealboxes/search/detail?page=1&name=${word}`)
            }
            notFoundWord={notFoundWord}
            replaceWord={'고단백질 아침 세트'}
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
