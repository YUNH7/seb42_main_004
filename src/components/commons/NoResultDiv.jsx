import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextButton } from '.';

function NoResultDiv({ search, notFoundWord, replaceWord }) {
  const { admin } = useSelector((state) => state.authReducer);
  return (
    <Div>
      {admin ? (
        <p>{notFoundWord}은(는) 존재하지 않는 상품입니다.</p>
      ) : (
        <>
          <p>찾고 계신 {notFoundWord}은(는) 목록에 추가될 예정입니다</p>
          <p>
            <TextButton
              inButton={replaceWord}
              onClick={() => search(replaceWord)}
              padding="4px 4px 4px 0"
              font="basic"
            />
            는 어떠세요?
          </p>
        </>
      )}
    </Div>
  );
}

export default NoResultDiv;

const Div = styled.div`
  margin: 1rem 0;
`;
