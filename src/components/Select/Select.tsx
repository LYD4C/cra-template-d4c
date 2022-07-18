import styled from 'styled-components'
import { Select as MSelect, MenuItem, SelectProps } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import { isDesktop } from '../../helpers/utils'

const MSelectWrapper = styled(MSelect)`
  &.MuiOutlinedInput-root{
    width: ${isDesktop ? '220px' : '2.72rem'};
    height: ${isDesktop ? '40px' : '0.4rem'};;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #F1F1F1;
  }
  &.MuiInputBase-root{
    text-align:center ;
    justify-content:center ;
  }
  &.MuiSelect-outlined{
    border:none
  }
`


interface MSelectProp {
  setValue: (value: any) => void;
  options: Array<{
    label: any;
    value: any;
  }>;
}


const Select: React.FC<SelectProps & MSelectProp> = ({ value, setValue, options }) => {
  const handleChange = (val: any) => {
    setValue(val)
  }

  return (
    <FormControl variant="outlined" >
      <MSelectWrapper
        displayEmpty
        value={value}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        onChange={event => {
          handleChange(event.target.value)
        }}
        renderValue={
          !value ? () => (
            <div style={{
              fontSize: 14, color: '#3333' }}
            >
              Please select
            </div>
          ) : (val: any) => <div>{val}</div>}
      >
        {options.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
      </MSelectWrapper>
    </FormControl>

  )
}

export default Select
