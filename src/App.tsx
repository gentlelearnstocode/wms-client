import { StyledEngineProvider } from '@mui/material';

import { Form } from '@components/common';

function App() {
  return (
    <StyledEngineProvider injectFirst={true}>
      <Form />
    </StyledEngineProvider>
  );
}

export default App;
