import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { queryClient } from '@libs/index';
import { ReactChildrenType } from '../types/common';
import { TodoListProvider } from '@providers/TodoProvider';

export const AppProvider = ({ children }: ReactChildrenType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          action={(snackbarId) => (
            <button onClick={() => closeSnackbar(snackbarId)}>Dismiss</button>
          )}
        >
          <BrowserRouter>
            <StyledEngineProvider injectFirst={true}>
              <ProSidebarProvider>
                <TodoListProvider>{children}</TodoListProvider>
              </ProSidebarProvider>
            </StyledEngineProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};
