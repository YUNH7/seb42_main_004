import { useLocation } from 'react-router-dom';

function useHasFooter() {
  let { pathname } = useLocation();

  return (
    pathname.includes('custom') ||
    pathname.includes('cart') ||
    pathname.includes('payment')
  );
}

export default useHasFooter;
