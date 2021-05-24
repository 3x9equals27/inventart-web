import styles from './LanguageMenu.module.css';
import { FlagPT, FlagGB } from '../../icons';
import React from 'react';
import { ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useSessionLanguage from '../../hooks/useSessionLanguage';

export const LocaleMenu: React.FC<{
  showText?: boolean,
  language?: string,
  setLanguageOverride?: (language: string) => void
}> = ({
  showText = false,
  language,
  setLanguageOverride
}) => {
    const { setSessionLanguage } = useSessionLanguage();
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const setLanguage = (language: string) => {
      handleClose();

      if (setLanguageOverride) {
        setLanguageOverride(language);
        return;
      }

      setSessionLanguage(language);
      i18n.changeLanguage(language);
    };

    const languageFlag = (lang?: string): JSX.Element => {
      switch (lang ?? language ?? i18n.language) {
        case 'en-GB': return <FlagGB width={40} />;
        case 'pt-PT': return <FlagPT width={40} />;
        default: return <FlagGB width={40} />;
      }
    };

    const languageText = (lang?: string): string => {
      switch (lang ?? language ?? i18n.language) {
        case 'en-GB': return 'English';
        case 'pt-PT': return 'Português';
        default: return 'English';
      }
    };

    return (
      <div className={styles.mainDiv}>
        <MenuItem aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
          <ListItemIcon className={showText ? styles.listItemIconWithText : styles.listItemIconAlone}>
            {languageFlag()}
          </ListItemIcon>
          {showText && <Typography variant="inherit">{languageText()}</Typography>}
        </MenuItem>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setLanguage('en-GB')}>
            <ListItemIcon>
              {languageFlag('en-GB')}
            </ListItemIcon>
            <Typography variant="inherit">{languageText('en-GB')}</Typography>
          </MenuItem>
          <MenuItem onClick={() => setLanguage('pt-PT')}>
            <ListItemIcon>
              {languageFlag('pt-PT')}
            </ListItemIcon>
            <Typography variant="inherit">{languageText('pt-PT')}</Typography>
          </MenuItem>
        </Menu>
      </div>
    );
  }

export default LocaleMenu;
