import { useLocation } from 'react-router-dom';

function useNoFooter() {
  let { pathname } = useLocation();

  return (
    pathname.includes('custom') ||
    pathname.includes('cart') ||
    pathname.includes('payment')
  );
}

export default useNoFooter;
