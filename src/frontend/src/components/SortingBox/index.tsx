import {Box, Select} from '@chakra-ui/react'
import React from 'react';

export interface SortingBoxProps {
  onChangeHandler : (e : React.ChangeEvent<HTMLSelectElement>) => void
}
 
const SortingBox: React.FC<SortingBoxProps> = ({onChangeHandler}) => {
  return (
    <Box d="flex" mt="5" ml="5" mb="5" mr="5">
      <Select placeholder="Sort By" maxWidth="200px" name="property" onChange={onChangeHandler}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </Select>
      <Select placeholder="Trend" maxWidth="200px" ml="10" name="trend" onChange={onChangeHandler} >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </Select>
    </Box>
  );
}
 
export default SortingBox;