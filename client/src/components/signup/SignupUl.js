import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoginButton from '../login/LoginButton';
import EmailInputDiv from './EmailInputDiv';
import InputDiv from './InputDiv';

function SignupUl() {
  useEffect(() => {
    const getElements = async () => {
      try {
        const response = await axios.post(
          'ec2-3-39-191-52.ap-northeast-2.compute.amazonaws.com:8080/users',
          JSON.stringify({
            email: 'myungju030@gmail.com',
            password: '1234',
            name: '강명주',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        const { data } = response;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getElements();
  }, []);

  return (
    <ContainerUl>
      <li>
        <Title>
          <h1>Signup</h1>
        </Title>
      </li>
      <li>
        <InputDiv name="닉네임" id="nickname" placeholder="nickname" />
      </li>
      <li>
        <EmailInputDiv />
      </li>
      <li>
        <InputDiv name="비밀번호" id="password" placeholder="password" />
      </li>
      <li>
        <InputDiv
          name="비밀번호 확인"
          id="confirmPassword"
          placeholder="password"
        />
      </li>
      <li>
        <LoginButton name="회원가입" />
      </li>
      <li>
        <LoginDiv>이미 아이디가 있으신가요? 로그인</LoginDiv>
      </li>
    </ContainerUl>
  );
}

export default SignupUl;

const ContainerUl = styled.ul`
  width: 300px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  list-style: none;

  > li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;

    > * {
      width: 100%;
    }
  }
`;
const Title = styled.title`
  display: flex;
  justify-content: center;
`;
const LoginDiv = styled.div`
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: var(--input_blue);
  }
`;
