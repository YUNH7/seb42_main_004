import { useDispatch } from 'react-redux';
import { setProfile } from '../reducers/userReducer';
import { initializeCart } from '../reducers/cartReducer';
import { setAuth, setEmail } from '../reducers/authReducer';

function useInitialize() {
  const dispatch = useDispatch();

  return () => {
    const initialize = new Promise((resolve) => {
      localStorage.removeItem('accessToken');
      dispatch(
        setAuth({
          isLogin: false,
          accessToken: '',
          user: {},
          roles: [],
        })
      );
      dispatch(setEmail(''));
      dispatch(setProfile({ imagePath: null, name: '' }));
      dispatch(initializeCart());
      resolve();
    });
    return initialize;
  };
}

export default useInitialize;
