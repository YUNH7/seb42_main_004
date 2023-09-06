import { Sort, SearchBarDiv } from '.';
import { Flex } from '../styled';

function FilterSearchDiv({ sortSubject, placeholder, toSearchBarDiv }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Sort sortSubject={sortSubject} />
      <SearchBarDiv placeholder={placeholder} {...toSearchBarDiv} />
    </Flex>
  );
}

export default FilterSearchDiv;
