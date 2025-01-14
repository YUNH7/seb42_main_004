import { useEffect, Suspense, lazy } from 'react';
import { Navigate, useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Footer, Header, Loading, ToTopButton } from './components/commons';
import { setProfile } from './reducers/userReducer';
import { setAuth, setEmail } from './reducers/authReducer';
import { getData, parseToken, setAuthorizationToken } from './util';
import { useNoFooter, useInitialize } from './hooks';
import GlobalStyle from './global/globalstyles';

const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Error = lazy(() => import('./pages/Error'));
const Custom = lazy(() => import('./pages/Custom'));
const Survey = lazy(() => import('./pages/Survey'));
const Signup = lazy(() => import('./pages/Signup'));
const MyInfo = lazy(() => import('./pages/MyInfo'));
const Payment = lazy(() => import('./pages/Payment'));
const AllBoxes = lazy(() => import('./pages/AllBoxes'));
const Products = lazy(() => import('./pages/Products'));
const SendEmail = lazy(() => import('./pages/SendEmail'));
const EditMyInfo = lazy(() => import('./pages/EditMyInfo'));
const SurveyHome = lazy(() => import('./pages/SurveyHome'));
const SignupOauth = lazy(() => import('./pages/SignupOauth'));
const ConfirmEmail = lazy(() => import('./pages/ConfirmEmail'));
const EditPassword = lazy(() => import('./pages/EditPassword'));
const FindPassword = lazy(() => import('./pages/FindPassword'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const RequestEmail = lazy(() => import('./pages/RequestEmail'));
const SurveyResult = lazy(() => import('./pages/SurveyResult'));
const CompleteEmail = lazy(() => import('./pages/CompleteEmail'));
const SignupComplete = lazy(() => import('./pages/SignupComplete'));

function App() {
  const { admin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const initialize = useInitialize();
  const noFooter = useNoFooter();
  const accessToken = localStorage.getItem('accessToken');
  const { pathname, search } = useLocation();

  if (accessToken) {
    setAuthorizationToken(accessToken);
  }

  useEffect(() => {
    let logoutTimer;
    if (accessToken) {
      const { exp, principal, roles } = parseToken(accessToken);
      dispatch(
        setAuth({
          isLogin: true,
          accessToken: accessToken,
          user: principal,
          admin: roles.includes('ADMIN'),
        })
      );
      dispatch(setEmail(''));
      getData('/users').then((data) => {
        dispatch(setProfile({ imagePath: data.imagePath, name: data.name }));
      });
      const remainingTime = Math.floor(
        (new Date(exp * 1000).getTime() - new Date().getTime()) / (60 * 1000)
      );
      logoutTimer = setTimeout(() => {
        initialize().then(() => {
          alert('자동 로그아웃되었습니다.');
        });
      }, remainingTime * 60 * 1000);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <>
      <GlobalStyle admin={admin && 1} />
      <Header />
      <BodyMargin
        className="marginbase"
        height={noFooter ? 1 : null}
        pathname={pathname}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<SurveyHome />} />
            <Route path="/mealboxes/*" element={<AllBoxes />} />
            <Route
              path="/survey/question/:page"
              element={admin ? <AllBoxes /> : <Survey />}
            />
            <Route path="/survey/result" element={<SurveyResult />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/myinfo/orderhistory"
              element={accessToken ? <OrderHistory /> : <Login />}
            />
            <Route path="/products/*" element={<Products />} />
            <Route
              path="/login"
              element={accessToken ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={accessToken ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/signup/oauth"
              element={accessToken ? <Navigate to="/" /> : <SignupOauth />}
            />
            <Route
              path="/signup/complete"
              element={accessToken ? <Navigate to="/" /> : <SignupComplete />}
            />
            <Route
              path="/myinfo"
              element={accessToken ? <MyInfo /> : <Navigate to="/login" />}
            />
            <Route
              path="/myinfo/edit"
              element={accessToken ? <EditMyInfo /> : <Navigate to="/login" />}
            />
            <Route
              path="/myinfo/edit/password"
              element={
                accessToken ? <EditPassword /> : <Navigate to="/login" />
              }
            />
            <Route path="/email/complete" element={<CompleteEmail />} />
            <Route path="/email/confirm" element={<ConfirmEmail />} />
            <Route
              path="/email/request"
              element={
                accessToken ? <RequestEmail /> : <Navigate to="/login" />
              }
            />
            <Route path="/email/send" element={<SendEmail />} />
            <Route
              path="/email/send/signup"
              element={<SendEmail pathName="signup" />}
            />
            <Route path="/email/send/password" element={<FindPassword />} />
            <Route
              path="/cart/payment/:orderId"
              element={accessToken ? <Payment /> : <Navigate to="/login" />}
            />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Suspense>
        <ToTopButton />
      </BodyMargin>
      <Footer />
    </>
  );
}

export default App;

const BodyMargin = styled.div`
  padding-top: ${(props) =>
    props.pathname === '/' ? '0' : 'calc(1rem + 50px)'};
  padding-bottom: 4rem;
  min-height: calc(100vh - 280px);

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '230px')});
    padding-bottom: calc(${(props) => (props.height ? '90px' : '0px')} + 4rem);
  }

  @media screen and (max-width: 480px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '180px')});
    padding-bottom: ${(props) =>
      props.pathname === '/'
        ? '0'
        : `calc(${(props) => (props.height ? '76px' : '0px')} + 4rem)`};
  }
`;
