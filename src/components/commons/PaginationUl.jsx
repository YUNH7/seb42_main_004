import styled from 'styled-components';

function PaginationUl({ page, totalpage, setPage }) {
  const count = totalpage < 5 ? totalpage : 5;
  const first = page < 4 ? 1 : totalpage - page < 3 ? totalpage - 4 : page - 2;
  const pages = new Array(count).fill(first).map((el, i) => el + i);

  return (
    <Pages>
      {!pages.includes(1) && (
        <PaginationLi onClick={setPage(1)}>{'<<'}</PaginationLi>
      )}
      {pages.map((li, i) => (
        <PaginationLi key={i} nowPage={li === page && 1} onClick={setPage(li)}>
          {li}
        </PaginationLi>
      ))}
      {!pages.includes(totalpage) && (
        <PaginationLi onClick={setPage(totalpage)}>{'>>'}</PaginationLi>
      )}
    </Pages>
  );
}

export default PaginationUl;

const Pages = styled.ul`
  list-style: none;
  display: flex;
  margin: 2rem -0.5rem 0;
  align-self: end;

  @media screen and (max-width: 480px) {
    align-self: center;
  }
`;
const PaginationLi = styled.li`
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: ${(props) => props.nowPage && 'bold'};
  text-align: center;
  color: var(${(props) => (props.nowPage ? '--white' : '--black')});
  background-color: var(
    ${(props) => (props.nowPage ? '--bucket_brown' : '--head_brown')}
  );
  border-radius: 4px;
  padding: 0.4rem;
  margin-right: 0.5rem;
  min-width: 1.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;
