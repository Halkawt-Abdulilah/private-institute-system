import './App.css';
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import {RouterProvider, createBrowserRouter}  from 'react-router-dom'
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

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
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  }
])

console.log(router)

function App() {
  return (
    <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
  );
}

export default App;
