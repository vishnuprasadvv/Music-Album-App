
import './App.css';
import AlbumDetails from './Pages/AlbumDetails';
import Home from './Pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/details/:id' element={ <AlbumDetails />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
