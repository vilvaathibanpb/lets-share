import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ThemeProvider, theme, colors } from 'react-native-design-system';
import Router from './src/Router';
import { IntlProvider } from 'react-intl';
theme.brandColor.primary = colors.green[700];

export default function App() {
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState({});
  useEffect(() => {
    import(`./src/translations/${language}.json`).then((res) => setMessages(res));
  }, [language]);

  return (
    <ThemeProvider value={theme}>
      <IntlProvider locale={language} messages={messages}>
        <Router />
      </IntlProvider>
    </ThemeProvider>
  );
}