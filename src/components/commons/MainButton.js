import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainButton = ({ name, url, handler, bgColor }) => {
  const navigate = useNavigate();

  return (
    <Button
      className="buttonstyle shadow"
      bgColor={bgColor}
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
  background-color: ${({ bgColor }) => bgColor || `var(--bucket_brown)`};
`;
