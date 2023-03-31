import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './ts/lib/react-query';
import { ReactChildrenType } from './ts/types';

const AppProvider = ({ children }: ReactChildrenType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst={true}>
          <ProSidebarProvider>{children}</ProSidebarProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProvider;
