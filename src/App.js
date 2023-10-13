import './App.css';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import {RouterProvider, createBrowserRouter}  from 'react-router-dom'
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

function App() {
  return (
    <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
  );
}

export default App;
