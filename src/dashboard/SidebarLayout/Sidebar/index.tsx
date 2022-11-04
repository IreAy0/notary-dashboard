import React, { useContext } from 'react';
// import Scrollbar from 'src/components/Scrollbar';
import {Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip} from '@mui/material';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import SidebarMenu from './SidebarMenu';
import { ReactComponent as Logo } from '../../../assets/icons/sidebarLogo.svg';
import { SidebarContext } from '../../../contexts/SidebarContext';
import styles from '../../../components/SideBar/SideBar.module.scss'


// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 1020;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  
  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background: '#fff',
          borderRight: '#e0e0e0 1px solid',
          boxShadow: `0 1px 0 ${alpha(theme.colors.primary.main, 0.95)}, 0px 2px 8px -3px `
        }}
      >
       <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
             <Link to="/" >
        <Logo />
         </Link>
            </Box>
          </Box>
          <Divider
            sx={{
              my: theme.spacing(2),
             
              background: theme.colors.secondary.light,
              backdropFilter: 'blur(3px)'
            }}
          />
          <SidebarMenu />
        <Divider
          sx={{
            background: theme.colors.secondary.light
          }}
        />
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: '#fff'
          }}
        >
          <div>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Link to="/" >
        <Logo />
         </Link>
              </Box>
            </Box>
            <Divider
              sx={{
                my: theme.spacing(2),
                background: theme.colors.secondary.light
              }}
            />
            <SidebarMenu />
          </div>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
