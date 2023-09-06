import { Sort, SearchBar } from '.';
import { Flex } from '../styled';

function SortSearch({ placeholder, sortSubject, searchSubject, searchWord }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Sort sortSubject={sortSubject} />
      <SearchBar
        placeholder={placeholder}
        searchSubject={searchSubject}
        searchWord={searchWord}
      />
    </Flex>
  );
}

export default SortSearch;
