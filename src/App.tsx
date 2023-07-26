import { MainRoutes } from './ts/routes';
import { AppProvider } from './ts/providers/AppProvider';
import './App.css';

function App() {
  return (
    <AppProvider>
      <MainRoutes />
    </AppProvider>
  );
}

export default App;
