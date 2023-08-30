import { Link } from 'react-router-dom';
import styled from 'styled-components';

function BannerLink() {
  return (
    <Banner className="shadow" to="/survey/question/1">
      다이어트용 밀박스를 추천 받으시겠습니까?
    </Banner>
  );
}

export default BannerLink;

const Banner = styled(Link)`
  position: sticky;
  z-index: 29;
  width: 100vw;
  height: 50px;
  top: 50px;
  left: 0;
  margin: -1rem -50vw 1rem;
  background-color: var(--signature);
  text-align: center;
  line-height: 50px;
  font-family: var(--f_hard);
  font-size: 1.1rem;
  color: var(--white);
  text-align: center;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;
