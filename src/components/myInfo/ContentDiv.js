import styled from 'styled-components';

function ContentDiv({ name, value, onInput }) {
  return (
    <ContainerDiv>
      <TitleDiv>{name}</TitleDiv>
      {name && name === '프로필 사진' ? (
        <UploadDiv>
          <label htmlFor="file" className="buttonstyle shadow">
            변경하기
          </label>
          <input id="file" type="file" accept="image/*" onInput={onInput} />
        </UploadDiv>
      ) : (
        <div>{value}</div>
      )}
    </ContainerDiv>
  );
}

export default ContentDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > div:last-child {
    flex-grow: 1;
  }
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: var(--f_hard);

  @media (max-width: 480px) {
    width: 80%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 60%;
  }
`;
const UploadDiv = styled.span`
  display: flex;

  > label {
    padding: 0 0.5rem;
    color: var(--white);
    border: 1px solid var(--signature);
    background-color: var(--signature);

    :hover {
      cursor: pointer;
    }
  }

  > input {
    display: none;
  }
`;
