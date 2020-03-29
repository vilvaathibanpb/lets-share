import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, theme, colors } from 'react-native-design-system';
import Router from './src/Router';
import { IntlProvider } from 'react-intl';
import { TRANSLATIONS } from './translations';

theme.brandColor.primary = colors.green[700];

export default function App() {
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState({});
  
  console.log(TRANSLATIONS);

  return (
    <ThemeProvider value={theme}>
      {/* <IntlProvider locale={language} messages={messages}> */}
        <Router />
      {/* </IntlProvider> */}
    </ThemeProvider>
  );
}