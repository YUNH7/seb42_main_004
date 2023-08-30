import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaShoppingCart } from '@react-icons/all-files/fa/FaShoppingCart.esm';
import { HiOutlineMenu } from '@react-icons/all-files/hi/HiOutlineMenu.esm';
import { CartCounter, MainButton, Navbar } from '.';
import { useToCustom, useInitialize } from '../../hooks';
import { logo_black as logo, profile } from '../../assets';

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const { isLogin, admin } = useSelector((state) => state.authReducer);
  const { imagePath, name } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const toCustom = useToCustom();
  const initialize = useInitialize();

  const handleClick = () => setOpenNav(!openNav);

  const handleLogout = () => {
    if (confirm('정말 로그아웃하시겠습니까?')) {
      initialize();
    } else {
      return;
    }
  };

  return (
    <ContainerHeader>
      <HeaderDiv className="marginbase shadow">
        <nav className="margininside">
          <MenuDiv>
            <MenuIcon onClick={handleClick}>
              <HiOutlineMenu size={30} />
            </MenuIcon>
            <LogoImg src={logo} alt="logo" onClick={() => navigate('/')} />
          </MenuDiv>
          <MenuUl>
            {!admin && (
              <li>
                <button onClick={() => navigate('/survey/question/1')}>
                  한끼밀 추천받기
                </button>
              </li>
            )}
            <li>
              <button onClick={toCustom}>커스텀 밀박스 만들기</button>
            </li>
            <li>
              <button onClick={() => navigate('/mealboxes')}>
                전체 상품 보기
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/products')}>
                구성품 알아보기
              </button>
            </li>
          </MenuUl>
          <UserButtons>
            {isLogin && (
              <ToMyInfo onClick={() => navigate('/myinfo')}>
                <Img src={imagePath || profile} alt="profile" />
              </ToMyInfo>
            )}
            <SignButtons>
              <MainButton
                handler={isLogin ? handleLogout : () => navigate('/login')}
                name={isLogin ? '로그아웃' : '로그인'}
                bgColor="var(--product_cocoa)"
              />
              {!isLogin && (
                <MainButton
                  handler={() => navigate('/signup')}
                  name="회원가입"
                />
              )}
            </SignButtons>
            {!admin && (
              <ToCart onClick={() => navigate('/cart')}>
                <FaShoppingCart size={25} />
                <CartCounter />
              </ToCart>
            )}
          </UserButtons>
        </nav>
      </HeaderDiv>
      {openNav ? (
        <Navbar
          isLogin={isLogin}
          name={name}
          imagePath={imagePath}
          handleClick={handleClick}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      ) : null}
    </ContainerHeader>
  );
}

export default Header;

const ContainerHeader = styled.header`
  ul {
    padding: 0;
    list-style: none;
    > li > * {
      cursor: pointer;
      font-family: var(--f_hard);
    }
  }
`;
const HeaderDiv = styled.div`
  height: 50px;
  background-color: var(--head_brown) !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 36;
  > nav {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  > * {
    cursor: pointer;
  }
`;
const MenuIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    display: none;
  }
`;
const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;
const MenuUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  > li {
    flex-basis: 120px;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const UserButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
const ToMyInfo = styled.button`
  width: 50px;
  height: 100%;
  border: none;
  background-color: transparent;

  @media (max-width: 768px) {
    display: none;
  }
`;
const SignButtons = styled(UserButtons)`
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;
const ToCart = styled.button`
  width: 50px;
  position: relative;
  height: 100%;
  border: none;
  background-color: transparent;
  > :last-child {
    position: absolute;
    top: 7px;
    right: 6px;
  }
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
