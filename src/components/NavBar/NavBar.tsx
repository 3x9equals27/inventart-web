import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import styles from './NavBar.module.css';
import { SessionInterface } from '../../interfaces/session.interface';
import { useTranslation } from 'react-i18next';
import React from 'react';
import LocaleMenu from '../LanguageMenu/LanguageMenu';
import { Menu, MenuItem } from '@material-ui/core';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { Permission } from '../../services/Authentication/Permission';

export const AppNavBar: React.FC<{
  session: SessionInterface,
  permissionManager: PermissionManager,
  logout: () => void
}> = ({
  session,
  permissionManager,
  logout
}) => {
    const history = useHistory();
    const { t } = useTranslation();
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchorEl(event.currentTarget);
    };
    const menuHandleClose = () => {
      setMenuAnchorEl(null);
    };

    return (
      <div className={styles.root}>
        <AppBar position='static'>
          <Toolbar className={styles.toolbar}>
            <div className={styles.divLeft}>
              <LocaleMenu />
              <Button color='inherit' variant='outlined' onClick={() => { history.push('/Tenant') }}>{t(session.tenant?.role ?? '')}@{session.tenant?.short_name}</Button>
            </div>
            <div className={styles.divCenter}>
              {/* <Button color='inherit' onClick={() => { history.push('/Home') }}>Home</Button> */}
              <Button color='inherit' onClick={() => { history.push('/DiagnosticList') }}>Diagnostics</Button>
              {/* <Button color='inherit' onClick={() => { history.push('/About') }}>About</Button> */}
            </div>
            <div className={styles.divRight}>
              <IconButton edge='end' className={styles.menuButton} color='inherit' aria-label='menu' aria-controls="context-menu" aria-haspopup="true" onClick={menuClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="context-menu"
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={menuHandleClose}
              >
                {permissionManager.Check(Permission.EDIT_SELF) && <MenuItem onClick={() => { menuHandleClose(); history.push('/UserSettings'); }}>
                  <Typography variant="inherit">User Settings</Typography>
                </MenuItem>}
                {permissionManager.Check(Permission.EDIT_PERMISSIONS) && <MenuItem onClick={() => { menuHandleClose(); history.push('/UserPermissions'); }}>
                  <Typography variant="inherit">User Permissions</Typography>
                </MenuItem>}
                <MenuItem onClick={() => logout()}>
                  <Typography variant="inherit">Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

export default AppNavBar;