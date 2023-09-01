import styled from 'styled-components';

function Pagination({ page, totalpage, setPage }) {
  const count = totalpage < 5 ? totalpage : 5;
  const first = page < 4 ? 1 : totalpage - page < 3 ? totalpage - 4 : page - 2;
  const pages = new Array(count).fill(first).map((el, i) => el + i);

  return (
    <Pages>
      {!pages.includes(1) && (
        <li>
          <PageButton onClick={setPage(1)}>{'<<'}</PageButton>
        </li>
      )}
      {pages.map((li, i) => (
        <li key={i}>
          <PageButton nowPage={li === page && 1} onClick={setPage(li)}>
            {li}
          </PageButton>
        </li>
      ))}
      {!pages.includes(totalpage) && (
        <li>
          <PageButton onClick={setPage(totalpage)}>{'>>'}</PageButton>
        </li>
      )}
    </Pages>
  );
}

export default Pagination;

const Pages = styled.ul`
  display: flex;
  margin-top: 2rem;
  align-self: end;
  gap: 0.5rem;

  @media screen and (max-width: 480px) {
    align-self: center;
  }
`;
const PageButton = styled.button`
  cursor: pointer;
  font-weight: ${(props) => props.nowPage && 'bold'};
  text-align: center;
  color: var(${(props) => (props.nowPage ? '--white' : '--black')});
  background-color: var(
    ${(props) => (props.nowPage ? '--bucket_brown' : '--head_brown')}
  );
  border-radius: 4px;
  padding: 0.4rem;
  min-width: 1.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;
