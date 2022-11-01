import React, { FC } from 'react';
import { Router as BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Router from 'router';
import history from 'utils/history';
import AppWrapper from './AppWrapper';
import ThemeProvider from '../theme/ThemeProvider';

const App: FC = () => (
    <BrowserRouter history={history}>
       <ThemeProvider>
      <AppWrapper>
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              border: '1px solid #abcdf1'
            },
            success: {
              style: {
                border: '1px solid #bee5c8'
              }
            },
            error: {
              style: {
                border: '1px solid #f5c5bb'
              }
            }
          }}
        />
        <Router />
      </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
);

export default App;

