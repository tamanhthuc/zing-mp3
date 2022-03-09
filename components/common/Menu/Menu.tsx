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
    <Box className="menu">
      <Box>
        <Box className="menu__top">
          <Link href="/" passHref>
            <Box
              className="menu__top__logo"
              component="img"
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
                >
                  <div className="menu__top__list__item--icon">{route.icon}</div>
                  <Box className="menu__top__list__item--name">{route.label}</Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box className="line"></Box>
        <Box className="menu__bottom" sx={{ mt: '10px' }}>
          <List className="menu__bottom__list">
            {ROUTE_LIST__BOTTOM.map((route, index) => (
              <Link key={route.id} href={route.path}>
                <Box
                  className={`menu__top__list__item ${
                    index === activeNavBottom ? 'menu__top__list__item--active' : ''
                  }`}
                
                >
                  <div className="menu__top__list__item--icon">{route.icon}</div>
                  <Box className="menu__top__list__item--name">{route.label}</Box>
                </Box>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Menu);
