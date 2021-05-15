import styles from './LanguageMenu.module.css';
import { FlagPT, FlagGB } from '../../icons';
import React from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useSessionLanguage from '../../hooks/useSessionLanguage';

export const LocaleMenu: React.FC = () => {
    const { setSessionLanguage } = useSessionLanguage();
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const setLanguage = (language: string) => {
      handleClose();
      setSessionLanguage(language);
      i18n.changeLanguage(language);
    };

    const currentLanguageFlag = (): JSX.Element => {
      switch (i18n.language) {
        case 'en-GB': return <FlagGB width={40} />;
        case 'pt-PT': return <FlagPT width={40} />;
        default: return <FlagGB width={40} />;
      }
    };

    return (
      <div className={styles.mainDiv}>
        <IconButton aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
          {currentLanguageFlag()}
        </IconButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setLanguage('en-GB')}>
            <ListItemIcon>
              <FlagGB width={40} />
            </ListItemIcon>
            <Typography variant="inherit">English</Typography>
          </MenuItem>
          <MenuItem onClick={() => setLanguage('pt-PT')}>
            <ListItemIcon>
              <FlagPT width={40} />
            </ListItemIcon>
            <Typography variant="inherit">Português</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }

export default LocaleMenu;
