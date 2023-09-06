import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGET from './useGET';

function useSortSearch(searchPath, sortPath, changeInPage) {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const { pathname, search } = useLocation();
  const [path, setPath] = useState('/products?page=1&sort=id&dir=DESC');

  const changeList = (uri) => (changeInPage ? setPath(uri) : navigate(uri));
  const searchSubject = (word) => {
    setSearchWord(word);
    const uri = word
      ? `${searchPath}?page=1&name=${word}`
      : `${sortPath}?page=1&sort=id&dir=DESC`;
    changeList(uri);
  };
  const sortSubject = (select) => {
    setSearchWord('');
    const sortBy = select.split('/');
    const uri = `${sortPath}?page=1&sort=${sortBy[0]}&dir=${sortBy[1]}`;
    changeList(uri);
  };
  const changePage = (num) => () => {
    const uri = changeInPage
      ? path
      : `${pathname}${search || '?page=1&sort=id&dir=DESC'}`;
    const newUri = uri.replace(/\?page=[0-9]+/, `?page=${num}`);
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

  const toSearchBarDiv = { searchSubject, searchWord };
  const toFilterSearchDiv = { sortSubject, toSearchBarDiv };
  const uri = `${pathname}${search || '?page=1&sort=id&dir=DESC'}`;
  const [res, isPending, error, getData] = useGET(changeInPage ? path : uri);

  return [
    toFilterSearchDiv,
    searchWord,
    changePage,
    res.data,
    res.pageInfo,
    isPending,
    error,
    getData,
    searchSubject,
    uri.includes('?page=1&') && !uri.includes('search'),
  ];
}

export default useSortSearch;
