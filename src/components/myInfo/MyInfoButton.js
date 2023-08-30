import styled from 'styled-components';

function MyInfoButton({ text, onClick }) {
  return (
    <Button onClick={onClick} className="buttonstyle shadow">
      {text}
    </Button>
  );
}

export default MyInfoButton;

const Button = styled.button`
  padding: 0px 20px;
  height: 30px;
  color: var(--white);
  background-color: var(--signature);
`;
