import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Nav';

import HatList from "./HatList"

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <HatList />
    </BrowserRouter>
  )
  }
export default App;
