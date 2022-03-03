import { List } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { memo } from 'react';
import { ROUTE_LIST } from './routes';
import { ROUTE_LIST__BOTTOM } from './routesBottom';

function Menu() {
  const { pathname } = useRouter();
  const activeNav = ROUTE_LIST.findIndex((e) => e.path === pathname);
  const activeNavBottom = ROUTE_LIST__BOTTOM.findIndex((e) => e.path === pathname);
 

  return (
    <Box
      sx={{
        width: '242px',
        position: 'fixed',
        height: '100vh',
        zIndex: 3,
        bgcolor: 'hsla(0,0%,100%,0.05);',
      }}
      className="menu"
    >
      <Box>
        <Box
          className="menu__top"
          sx={{
            pb: 2,
          }}
        >
          <Link href="/" passHref>
            <Box
              className="menu__top__logo"
              component="img"
              sx={{ width: 125, height: 40, mt: '15px', ml: '24px', cursor: 'pointer' }}
              src="https://static-zmp3.zadn.vn/skins/zmp3-v5.2/images/logo-mp-3.svg"
              alt="Live from space album cover"
            />
          </Link>

          <Box className="menu__top__list">
            {ROUTE_LIST.map((route, index) => (
              <Link key={route.id} href={route.path} passHref>
                <Box
                  className={`menu__top__list__item ${
                    index === activeNav ? 'menu__top__list__item--active' : ''
                  }`}
                  sx={{
                    color: 'rgb(211,216,218)',

                    cursor: 'pointer',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    pl: '30px',
                    ':hover': {
                      color: '#fff',
                    },
                    height: '40px',
                  }}
                >
                  {route.icon}
                  <Box sx={{ ml: '12px', fontWeight: '600', fontSize: '14px', userSelect: 'none' }}>
                    {route.label}
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'rgb(85, 84, 84)', mx: '30px' }}></Box>
        <Box className="menu__bottom" sx={{ mt: '10px' }}>
          <List className="menu__bottom__list">
            {ROUTE_LIST__BOTTOM.map((route, index) => (
              <Link key={route.id} href={route.path}>
                <Box
                  className={`menu__top__list__item ${
                    index === activeNavBottom ? 'menu__top__list__item--active' : ''
                  }`}
                  sx={{
                    color: 'rgb(211,216,218)',
                    cursor: 'pointer',
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    pl: '30px',
                    ':hover': {
                      color: '#fff',
                    },
                    height: '40px',
                  }}
                >
                  {route.icon}
                  <Box sx={{ ml: '12px', fontWeight: '600', fontSize: '14px' }}>{route.label}</Box>
                </Box>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Menu)
