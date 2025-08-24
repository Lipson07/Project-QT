
import { Route, Routes } from 'react-router-dom';
import './App.scss'
import MeetPage from "./Components/Reg/MeetPage.tsx";
import Ecran_main from './Components/Main/Ecran_main.tsx';
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<MeetPage />} />
        <Route path="/main" element={<Ecran_main />} />
        </Routes>
  </>
  )
}

export default App
