import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { HiOutlineMenu as HamburgerIcon } from '@react-icons/all-files/hi/HiOutlineMenu.esm';
import { MainButton, Navbar, TabsInNav, ToCart } from '.';
import { useInitialize } from '../../hooks';
import { logo_black as logo, profile } from '../../assets';

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const { isLogin, admin } = useSelector((state) => state.authReducer);
  const { imagePath, name } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const initialize = useInitialize();

  const toPath = (path) => () => navigate(path);
  const handleLogout = () =>
    confirm('정말 로그아웃하시겠습니까?') && initialize();
  const handleNavBar = () => setOpenNav(!openNav);

  return (
    <>
      <Wrapper className="marginbase shadow">
        <div className="margininside">
          <button onClick={handleNavBar}>
            <MenuIcon size={30} />
          </button>
          <button onClick={toPath('/')}>
            <Img size="50px" src={logo} alt="logo" />
          </button>
          <TabsInNav />
          <UserButtons>
            {isLogin && (
              <ToMyInfo onClick={toPath('/myinfo')}>
                <Img size="30px" src={imagePath || profile} alt="profile" />
              </ToMyInfo>
            )}
            <SignButtons>
              <MainButton
                handler={isLogin ? handleLogout : toPath('/login')}
                name={isLogin ? '로그아웃' : '로그인'}
                bgColor="var(--product_cocoa)"
              />
              {!isLogin && (
                <MainButton handler={toPath('/signup')} name="회원가입" />
              )}
            </SignButtons>
            {!admin && <ToCart />}
          </UserButtons>
        </div>
      </Wrapper>
      {openNav && (
        <Navbar
          isLogin={isLogin}
          name={name}
          imagePath={imagePath}
          handleClick={handleNavBar}
          handleLogout={handleLogout}
          toPath={toPath}
        />
      )}
    </>
  );
}

export default Header;

const Wrapper = styled.header`
  z-index: 36;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: var(--head_brown) !important;

  > div {
    justify-content: space-between;
  }
`;
const MenuIcon = styled(HamburgerIcon)`
  width: auto;
  height: auto;
  padding: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;
const Img = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;
const UserButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
const ToMyInfo = styled.button`
  width: 50px;
  height: 100%;

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
