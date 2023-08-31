import styled from 'styled-components';
import { IoIosArrowForward as ArrowIcon } from '@react-icons/all-files/io/IoIosArrowForward.esm';
import { FiLogOut as LogoutIcon } from '@react-icons/all-files/fi/FiLogOut.esm';
import { TabsInNav } from '.';
import { profile } from '../../assets';

function Navbar({
  isLogin,
  name,
  imagePath,
  handleClick,
  handleLogout,
  toPath,
}) {
  return (
    <ModalContainerDiv onClick={handleClick}>
      <NavDiv onClick={(e) => e.stopPropagation()}>
        <AboutUser
          height="50px"
          onClick={toPath(isLogin ? '/myinfo' : '/login')}
        >
          <Img src={imagePath || profile} alt="profile_image" />
          <UserText>
            {isLogin ? (
              <>
                <Name>{name}</Name>님
              </>
            ) : (
              '로그인 하러 가기'
            )}
          </UserText>
          <ArrowIcon size={15} />
        </AboutUser>
        <hr />
        <TabsInNav flexDirection="column" tabSize="80px" />
        {isLogin && (
          <AboutUser height="80px" onClick={handleLogout}>
            <LogoutIcon size={25} />
            <UserText>로그아웃</UserText>
          </AboutUser>
        )}
      </NavDiv>
    </ModalContainerDiv>
  );
}

export default Navbar;

const ModalContainerDiv = styled.div`
  z-index: 34;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 360px;
  height: 100vh;
  background-color: var(--gray_070);

  @media (min-width: 768px) {
    display: none;
  }
`;
const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  padding-top: 50px;
  background-color: var(--head_brown);
  animation-name: pop;
  animation-duration: 250ms;

  @keyframes pop {
    from {
      width: 30vw;
    }
    to {
      width: 50vw;
    }
  }

  > hr {
    border: none;
    border-bottom: 1px solid var(--black);
    width: 100%;
  }
`;
const AboutUser = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  margin: 40px 0px;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
const UserText = styled.span`
  font-family: var(--f_hard);
  padding: 0px 0.5rem;
  font-size: 1.3rem;
`;
const Name = styled.span`
  font-family: var(--f_hard);
  margin-right: 0.2rem;
  font-size: 1.5rem;
`;
