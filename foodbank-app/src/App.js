import './App.css';
import React, { Fragment } from 'react';

import {Home} from './Home';
import Navigation from './Navigation';
import NewLogin from './Components/Accounts/NewLogin';
import Donor from './Components/Donor/Donor';
import Collection from './Components/Collection/Collection';
import ParticipationPage from './Components/Participation/ParticipationPage';
import OldCollection from './Components/CollectionHistory/OldCollection';

import {HashRouter as Router, Route, Routes} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="container">

            <Navigation/>
            <div style={{paddingTop: "45px"}}> 
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/contacts' element={<Donor/>}/>
                <Route path='/collections' element={<Collection/>}/>
                <Route path='/archive' element={<OldCollection/>}/>
                <Route exact path='/login' element={<NewLogin/>}/>
                <Route exact path='/participants' element={<ParticipationPage/>}/>
              </Routes>
            </div>
            
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
