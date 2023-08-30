import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainButton = ({ name, url, handler }) => {
  const navigate = useNavigate();

  return (
    <Button
      className="buttonstyle shadow"
      name={name}
      onClick={url ? () => navigate(`${url}`) : handler}
    >
      {name}
    </Button>
  );
};

export default MainButton;

export const Button = styled.button`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${({ name }) =>
    name.includes('로그') || name.includes('추천 받기')
      ? `var(--product_cocoa)`
      : `var(--bucket_brown)`};
`;
