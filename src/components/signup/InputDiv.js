import styled, { css } from 'styled-components';

function InputDiv({
  id,
  name,
  labelName,
  placeholder,
  value,
  inputRef,
  validText,
  onChange,
  onKeyUp,
  disabled,
}) {
  return (
    <ContainerDiv validText={validText}>
      <label htmlFor={id}>{labelName}</label>
      <input
        id={id}
        name={name}
        className="inputstyle"
        type={name && name.includes('password') ? 'password' : 'text'}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
      ></input>
      <div>{validText}</div>
    </ContainerDiv>
  );
}

export default InputDiv;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > label {
    height: 20px;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-family: var(--f_hard);
    color: ${({ validText }) =>
      validText ? `rgba(216, 75, 75,1)` : `var(--black)`};
  }

  > input {
    height: 48px;
    padding-right: 3rem;

    ::placeholder {
      font-size: 0.85rem;
    }

    ${({ validText }) =>
      validText &&
      css`
        padding: 0.5rem 1.5rem;
        border: 1px solid rgba(216, 75, 75, 1);
        border-radius: 4px;

        &:focus,
        :focus-within {
          border: 2px solid rgba(216, 75, 75, 1);
          outline: none;
        }
      `}
  }

  > div {
    padding-top: 0.5rem;
    color: rgba(216, 75, 75, 1);
  }
`;
