import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider, theme, colors } from 'react-native-design-system';
import Router from './src/Router';

theme.brandColor.primary = colors.green[700];

export default function App() {
  return (
    <ThemeProvider value={theme}>
      <Router />
    </ThemeProvider>
  );
}