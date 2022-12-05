import React, { useContext } from 'react';

import {ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem} from '@mui/material';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import { NavLink, Link } from 'react-router-dom';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import { ReactComponent as HomeIcon } from '../../../../assets/icons/homeIcon.svg';
import { ReactComponent as MYDocsIcon } from '../../../../assets/icons/myDocsIcon.svg';
import { ReactComponent as MYRequestIcon } from '../../../../assets/icons/requestIcon.svg';
import { ReactComponent as SettingsIcon } from '../../../../assets/icons/settingsIcon.svg';
import { ReactComponent as TemplateIcon } from '../../../../assets/icons/template.svg';
// import { ReactComponent as Logo } from '../../assets/icons/sidebarLogo.svg';

// import styles from '../../';
import styles from '../../../../components/SideBar/SideBar.module.scss'

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: '#4a494e';
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        <div className={styles.menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <NavLink exact activeClassName={styles.active} className={styles.menu__link} to="/">
            <button type="button" className={styles.menu__icon}>
              <HomeIcon />
            </button>
            <span className={styles.menu__label}>Dashboard</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/locker">
            <button>
              <MYDocsIcon />
            </button>
            <span className={styles.menu__label}>Locker</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/requests">
            <button>
              <MYRequestIcon />
            </button>
            <span className={styles.menu__label}>Requests</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/templates">
            <button>
              <TemplateIcon/>
            </button>
            <span className={styles.menu__label}>Templates</span>
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink activeClassName={styles.active} className={styles.menu__link} to="/settings/Personal_Info">
            <button>
              <SettingsIcon />
            </button>
            <span className={styles.menu__label}>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
      
        
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
