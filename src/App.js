import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './theme'
import MainRouter from './MainRouter'

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainRouter/>
        </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
