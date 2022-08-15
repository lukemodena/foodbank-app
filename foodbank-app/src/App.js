import './App.css';

import {Home} from './Home';
import {Donor} from './Components/Donor/Donor';
import {Collection} from './Components/Collection/Collection';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          FoodReach
        </h3>

        <Navigation/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/donor' element={<Donor/>}/>
          <Route path='/collection' element={<Collection/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
