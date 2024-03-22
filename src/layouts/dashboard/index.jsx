/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSessionStorage } from 'usehooks-ts';
import { useLayoutEffect, useState } from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import { AUTHENTICATE_KEY } from 'src/constants/auth.constant';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [openNav, setOpenNav] = useState(false);

  const [authSession] = useSessionStorage(AUTHENTICATE_KEY, null);

  const navigateToLogin = () => {
    router.push('/login');
  };
  useLayoutEffect(() => {
    if (!authSession || !authSession.user) {
      navigateToLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSession]);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
