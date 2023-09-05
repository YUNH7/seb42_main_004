import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGET from './useGET';

function useFilterSearch(setPath, searchPath, sortPath, path) {
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState(['id', 'DESC']);
  const [notFoundWord, setNotFoundWord] = useState(searchWord);

  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=DESC';
  const [page, setPage] = useState(1);

  const searchSubject = () => {
    if (setPath) {
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
    if (setPath) setPath(paginationUrl(page));
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
    !setPath ? navigate(paginationUrl(page)) : setPage(page);
  const uri = `${pathname}${search}`;
  const [res, isPending, error, getData] = useGET(path || uri);

  return [
    toFilterSearchDiv,
    notFoundWord,
    changePage,
    uri,
    res,
    isPending,
    error,
    getData,
  ];
}

export default useFilterSearch;
