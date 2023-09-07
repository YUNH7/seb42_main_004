import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGET from './useGET';

function useSortSearch(searchPath, sortPath, changeInPage) {
  const { pathname, search } = useLocation();
  const uri = `${pathname}${search || '?page=1&sort=id&dir=DESC'}`;
  const [path, setPath] = useState('/products?page=1&sort=id&dir=DESC');
  const [res, isPending, error, getData] = useGET(changeInPage ? path : uri);
  const [searchWord, setSearchWord] = useState('');
  const navigate = useNavigate();

  const changeList = (uri) => (changeInPage ? setPath(uri) : navigate(uri));

  const sortSubject = (select) => {
    setSearchWord('');
    const sortBy = select.split('/');
    changeList(`${sortPath}?page=1&sort=${sortBy[0]}&dir=${sortBy[1]}`);
  };

  const searchSubject = (word) => {
    if (!word) sortSubject('id/DESC');
    else {
      setSearchWord(word);
      changeList(`${searchPath}?page=1&name=${word}`);
    }
  };

  const changePage = (num) => () => {
    const newUri = (changeInPage ? path : uri).replace(
      /\?page=[0-9]+/,
      `?page=${num}`
    );
    changeList(newUri);
  };

  useEffect(() => {
    if (pathname.includes('search')) {
      const word = decodeURI(search.split('&name=')[1]);
      if (word !== searchWord) {
        setSearchWord(word);
      }
    } else {
      setSearchWord('');
    }
  }, [search]);

  const sortSearch = { sortSubject, searchSubject, searchWord };
  const sortedFirstPage = uri.includes('?page=1&') && !uri.includes('search');

  return {
    sortSearch,
    changePage,
    data: res.data,
    pageInfo: res.pageInfo,
    isPending,
    error,
    getData,
    sortedFirstPage,
  };
}

export default useSortSearch;
