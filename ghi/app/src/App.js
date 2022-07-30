import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList';

function App(props) {
  let {shoesList} = props
  return (
    <div>
      <Nav />
      <ShoeList shoes={shoesList} />
      <div className="container">
        {/* <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
