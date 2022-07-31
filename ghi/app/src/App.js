import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Nav';
import DisplayHatDetails from "./HatDetail"
import HatList from "./HatList"
import NewHatForm from "./NewHatForm"

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>   
          <Route path="/hats" element={<HatList /> } />
          <Route path="/hatDetail" element={<DisplayHatDetails /> }/> 
          <Route path="/newhatform" element={<NewHatForm /> } /> 
        </Routes>

    </BrowserRouter>
  )
  }
export default App;
{/* <BrowserRouter>
<Nav />
<div className="container">
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/shoes" element={<ShoeList />} />
    <Route path="/shoes/new" element={<ShoeForm />} />
    <Route path="/hats" element={<HatList />} />
    <Route path="/hats/new" element={<HatForm />} />
  </Routes>
</div>
</BrowserRouter> */}
