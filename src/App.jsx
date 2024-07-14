import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CricketPage from './pages/CricketPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PlayerProfile from './pages/PlayerProfile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage/>}></Route>
      <Route path='/cricket-match' element={<CricketPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/profile' element={<PlayerProfile />}></Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />;
}

export default App
