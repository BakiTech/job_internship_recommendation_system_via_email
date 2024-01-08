import { Login } from "./components/Login"
import MainPage from "./components/MainPage"
import { Signup } from "./components/Signup"
import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <MainPage/>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
