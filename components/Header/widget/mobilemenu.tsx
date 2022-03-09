import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'

type Anchor = 'menu'

export default function MobileMenu(props: { item: string; href: string }) {
  const [state, setState] = React.useState({
    menu: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      className=" item-center h-64"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ height: '100%' }}>
        {navList.map((items, index) => (
          <Link
            href={items.href}
            underline="none"
            className="font-regular py-4 px-5 text-lg text-[#1D2B4F] transition duration-300 hover:text-black"
          >
            {/* <ListItem
                  button
                  key={index}
                  sx={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    fontSize: '24px',
                  }}
                > */}
            {items.item}
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      {(['menu'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon className="text-3xl text-[#1D2B4F]" />
          </Button>
          <Drawer
            anchor={'top'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
