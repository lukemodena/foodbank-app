import './App.css';
import React, { Fragment } from 'react';

import {Home} from './Home';
import {Navigation} from './Navigation';
import NewLogin from './Components/Accounts/NewLogin';
import {Register} from './Components/Accounts/Register';
import Donor from './Components/Donor/Donor';
import Collection from './Components/Collection/Collection';


import {HashRouter as Router, Route, Routes} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './Components/common/PrivateRoute';

function App() {
  let authenticated = window.localStorage.getItem('isAuthenticated');
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container">

            <Navigation/>

            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/donor' element={<Donor/>}/>
              {/* {authenticated && <Route path='/donor' element={<Donor/>}/>} */}
              <Route path='/collections' element={<Collection/>}/>
              <Route exact path='/login' element={<NewLogin/>}/>
              <Route exact path='/register' element={<Register/>}/>
            </Routes>
            
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
