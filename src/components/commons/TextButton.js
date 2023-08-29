import styled from 'styled-components';

const TextButton = ({
  inButton,
  onClick,
  padding,
  margin,
  fw,
  fs,
  font,
  hover,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      padding={padding}
      margin={margin}
      fw={fw}
      fs={fs}
      font={font}
      hoverNone={hover}
      rest={rest}
    >
      {inButton}
    </Button>
  );
};

export default TextButton;

export const Button = styled.button`
  border: none;
  background: none;
  padding: ${(props) => props.padding || '4px'};
  margin: ${(props) => props.margin || ''};
  font-weight: ${(props) => props.fw || 'bold'};
  font-size: ${(props) => props.fs || ''};
  font-family: ${(props) =>
    props.font === 'basic'
      ? "'Noto Serif KR', serif"
      : "'IBM Plex Sans KR', sans-serif"};
  color: var(--black);
  :hover {
    color: ${(props) => !props.hoverNone && 'var(--input_blue)'};
  }
  ${(props) => props.rest}
`;
