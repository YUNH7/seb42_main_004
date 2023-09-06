import styled from 'styled-components';
import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt.esm';
import { OrderHistoryPageButton } from '../orderHistory';

function SearchBar({ placeholder, searchSubject, searchWord, setSearchWord }) {
  return (
    <Wrapper>
      <Input
        className="inputstyle"
        maxLength={20}
        placeholder={placeholder && placeholder}
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && searchSubject()}
      />
      <OrderHistoryPageButton handler={searchSubject} text="검색" />
      <GlassesIcon />
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 0.5rem;
  height: 2rem;
  align-self: flex-end;

  > button {
    height: auto;
    word-break: keep-all;
    margin-left: 0.2rem;
    padding: 0.1rem 0.5rem;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 0.8rem;
    width: 49%;
    height: 3rem;

    > button {
      display: none;
    }
  }
`;
const Input = styled.input`
  width: 150px;
  padding: 0.4rem;
  padding-left: 2rem;

  :focus {
    border: 2px solid var(--signature);
  }

  @media screen and (max-width: 768px) {
    padding-left: 3rem;
    width: 100%;
  }
`;
const GlassesIcon = styled(BiSearchAlt)`
  position: absolute;
  margin: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  fill: var(--signature);
  top: 0;

  @media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
  }
`;
