import styled from 'styled-components';

function NoContent({ icon, message }) {
  return (
    <Empty>
      {icon}
      <Text>{message}</Text>
    </Empty>
  );
}

export default NoContent;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;

  svg {
    width: 10rem;
    height: 10rem;
    fill: var(--signature);
  }
`;

const Text = styled.div`
  font-size: 1.5rem;
  font-family: var(--f_hard);
`;
