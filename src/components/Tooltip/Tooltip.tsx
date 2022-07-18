import React, { PropsWithChildren, useState } from 'react'
import { Tooltip as MTooltip, TooltipProps } from '@material-ui/core'
import {
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import { isDesktop } from '../../helpers/utils'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '12px',
        color: '#666666',
        backgroundColor: '#FFFFF',
        boxShadow: '0px 2px 8px 0px rgba(153,153,153,1)',
      },
    },
  },
})

interface Iprop {
  text: string;
  children: React.ReactElement;
  placement?: TooltipProps['placement'];
}

const Tooltip: React.FC<PropsWithChildren<Iprop>> = ({
  children,
  text,
  placement = 'top',
}) => {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <MuiThemeProvider theme={theme}>
      {isDesktop &&
      <MTooltip title={text} placement={placement} >
        {children}
      </MTooltip>}
      {!isDesktop &&
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <MTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={text}
          >
            <div onClick={handleTooltipOpen}>
              {children}
            </div>
          </MTooltip>
        </div>
      </ClickAwayListener>}

    </MuiThemeProvider>

  )
}

export default Tooltip
