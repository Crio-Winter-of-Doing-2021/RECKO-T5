import { Radio, RadioGroup, Stack, Box } from "@chakra-ui/react"

export interface FilterBoxProps {
  onRadioChangeHandler : (x : "ALL" | "XERO" | "QUICKBOOKS") => void
  radioValue : "ALL" | "XERO" | "QUICKBOOKS"
}
 
const FilterBox: React.FC<FilterBoxProps> = ({onRadioChangeHandler, radioValue}) => {
  return (
    <Box margin = "5">
      <RadioGroup onChange={onRadioChangeHandler} value={radioValue}>
        <Stack direction="row">
          <Radio value="ALL">All</Radio>
          <Radio value="XERO">Xero</Radio>
          <Radio value="QUICKBOOKS">Quickbooks</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}
 
export default FilterBox;