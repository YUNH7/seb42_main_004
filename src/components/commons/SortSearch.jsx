import { Sort, SearchBar } from '.';
import { Flex } from '../styled';

function SortSearch({ sortSubject, placeholder, toSearchBarDiv }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Sort sortSubject={sortSubject} />
      <SearchBar placeholder={placeholder} {...toSearchBarDiv} />
    </Flex>
  );
}

export default SortSearch;
