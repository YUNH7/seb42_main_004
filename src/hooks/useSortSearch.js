import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGET from './useGET';

function useSortSearch(searchPath, sortPath, changeInPage) {
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState('');
  const [notFoundWord, setNotFoundWord] = useState(searchWord);
  const [sortBy, setSortBy] = useState(['id', 'DESC']);

  const { pathname, search } = useLocation();
  const [page, setPage] = useState(1);
  const [path, setPath] = useState('/products?page=1&sort=id&dir=DESC');

  const searchSubject = () => {
    if (changeInPage) {
      setPage(1);
      setPath(paginationUrl(1));
    } else navigate(paginationUrl(1));
  };

  const paginationUrl = (page) => {
    setNotFoundWord(searchWord);
    return searchWord
      ? `${searchPath}?page=${page}&name=${searchWord}`
      : `${sortPath}?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`;
  };

  const sortSubject = (select) => {
    setSearchWord('');
    const sortBy = select.split('/');
    setSortBy(sortBy);
  };

  useEffect(() => {
    if (changeInPage) setPath(paginationUrl(page));
    else navigate(paginationUrl(1));
  }, [page, sortBy]);

  useEffect(() => {
    if (pathname.includes('search')) {
      const word = decodeURI(search.split('&name=')[1]);
      if (word !== searchWord) {
        setSearchWord(word);
        setNotFoundWord(word);
      }
    } else {
      setSearchWord('');
      setNotFoundWord('');
    }
  }, [search]);

  const toSearchBarDiv = { searchSubject, searchWord, setSearchWord };
  const toFilterSearchDiv = { sortSubject, toSearchBarDiv };
  const changePage = (page) => () =>
    changeInPage ? setPage(page) : navigate(paginationUrl(page));
  const uri = `${pathname}${search || '?page=1&sort=id&dir=DESC'}`;
  const [res, isPending, error, getData] = useGET(changeInPage ? path : uri);

  return [
    toFilterSearchDiv,
    notFoundWord,
    changePage,
    uri,
    res.data,
    res.pageInfo,
    isPending,
    error,
    getData,
    setPath,
  ];
}

export default useSortSearch;
