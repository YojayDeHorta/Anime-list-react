import { Container, } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InboxIcon from '@mui/icons-material/Inbox';
import AnimeDetails from './pages/AnimeDetails';

const navLinks = [
  {
    title:"home", path : "/", icon:<InboxIcon />
  },
  /*{
    title:"Anime Details", path : "/anime/",icon:<InboxIcon />
  },
  {
    title:"a", path : "/a",icon:<InboxIcon />
  },
  {
    title:"Form", path : "/form",icon:<InboxIcon />
  },*/
]
export default function App() {
  return (

    <>
      <Navbar navLinks={navLinks}/>
      <Container >
        <Routes>
            <Route path='/' element={<Home/>}/>
             <Route path='/anime/:id' element={<AnimeDetails/>}/>
            {/*<Route path='/a' element={<A/>}/>
            <Route path='/form' element={<Formulario/>}/> */}
            
        </Routes>
      </Container>
    </>

  )
}