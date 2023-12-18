import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Currency } from '@/shared/enums';
import { LanguageKey } from '@/shared/i18n/i18n';
import { changeLanguage, changeCurrency } from '@/shared/store/profile/profile-slice';

const HeaderMenu = (): JSX.Element => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [currencyMenuAnchorEl, setCurrencyMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLanguageMenuOpen = Boolean(languageMenuAnchorEl);
  const isCurrencyMenuOpen = Boolean(currencyMenuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLanguageMenuAnchorEl(null);
    setCurrencyMenuAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const handleCurrencyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (language: LanguageKey) => {
    i18n.changeLanguage(language);
    dispatch(changeLanguage(language));
    handleMenuClose();
  };

  const handleCurrencyChange = (currency: Currency) => {
    dispatch(changeCurrency(currency));
    handleMenuClose();
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        aria-controls={isMenuOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleMenuOpen}
        color="inherit"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        disableScrollLock={true}
      >
        <MenuItem onClick={handleLanguageMenuOpen}>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText primary={t('Choose language')} />
        </MenuItem>
        <Menu
          anchorEl={languageMenuAnchorEl}
          open={isLanguageMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>{t('English')}</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('rus')}>{t('Russian')}</MenuItem>
        </Menu>

        <MenuItem onClick={handleCurrencyMenuOpen}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t('Choose currency')} />
        </MenuItem>
        <Menu
          anchorEl={currencyMenuAnchorEl}
          open={isCurrencyMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => handleCurrencyChange(Currency.KZT)}>{t('Kazakhstani Tenge')}</MenuItem>
          <MenuItem onClick={() => handleCurrencyChange(Currency.RUB)}>{t('Russian Ruble')}</MenuItem>
        </Menu>
      </Menu>
    </div>
  );
};

export { HeaderMenu };
