import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './App.css'
import { lazy } from 'react'

import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CricketPage from './pages/CricketPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PlayerProfile from './pages/PlayerProfile'
import { AppProviders } from './context/Providers'
import Teamup from './components/sports/Teamup'
import Toss from './components/sports/toss/Toss'
import PickPlayer from './components/common/PickPlayer'
import TossDecision from './components/sports/toss/TossDecision'
import SelectPlayer from './components/common/SelectPlayer'
import ModalFormLayout from './layout/componentLayout/ModalFormLayout'
import CricketGameConfigForm from './components/cricket/CricketGameConfigForm'
import ModalPanelLayout from './layout/componentLayout/ModalPanelLayout'
import CricketConfigForm from './components/sports/CricketConfigForm'
import ToggleButton from './components/common/ToggleButton'
import SelectProfileIcon from './components/common/SelectProfileIcon'
import CoinFlip from './components/sports/toss/CoinFlip'
import ChoosingAfterToss from './components/sports/toss/ChoosingAfterToss'
import SelectBatterAndBolwer from './components/cricket/form/SelectBatterAndBolwer'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage/>}></Route>
      <Route path='/cricket-match' element={<CricketPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignupPage/>}></Route>
      <Route path='/profile' element={<PlayerProfile />}></Route>
      {/* <Route path='/teamup' element={<Teamup />}></Route>
      <Route path='/toss' element={<Toss />} ></Route>
      <Route path='/pick' element={<TossDecision />} ></Route>
      <Route path='/select' element={<SelectPlayer />} ></Route>
      <Route path='/form' element={<CricketGameConfigForm />} ></Route> */}
      <Route path='/player' element={<PickPlayer />} ></Route>
      <Route path='/sel' element={<SelectBatterAndBolwer />} ></Route>
      <Route path='/pan' element={<ModalPanelLayout />} ></Route>
      <Route path='/cric' element={<CricketConfigForm />} ></Route>
      <Route path='/toggle' element={<ToggleButton />} ></Route>
      <Route path='/icon' element={<SelectProfileIcon />} ></Route>
      <Route path='/coin' element={<CoinFlip />} ></Route>
      <Route path='/pick' element={<ChoosingAfterToss />} ></Route>

    </Route>
  )
)

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App
