import React, { useState, useEffect } from 'react';
// import firebase from '../firebase/firebase'
import { useTranslation } from 'react-i18next';
// import MobileOTP from '../OTP/mobileOTP';

function LanguageSwitcher({ selectedLanguage, onLanguageChange }) {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng) => {
      onLanguageChange(lng);
  };

  return null;

} 

export default LanguageSwitcher;
