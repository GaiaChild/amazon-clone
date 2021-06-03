import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useEffect} from 'react'
import './App.css';
import { auth } from './firebase';
import { useStateValue } from './data/StateProvider';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

import Header from './components/Header';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentsPage from './pages/PaymentsPage';
import OrdersPage from './pages/OrdersPage';

const promise = loadStripe('pk_test_51HRfwSGQCYQWTAXeCmwwb6Oxvbb4alB1mObywJmFKBQlKGOjZZAeEzZ0kGOBaEHjeTUCB4W5s4aqg17ynrRN2sXt008DVv9pIV')

function App() {

  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS : ', authUser)

      if(authUser){
        //just or was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[dispatch])

  return (
    <Router>
      <div className="App">
        
        <Switch>
        <Route path='/orders'>
            <Header/>
            <OrdersPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/signup'>
            <SignupPage/>
          </Route>
          <Route path='/payments'>
            <Header/>
            <Elements stripe={promise}>
              <PaymentsPage/>
            </Elements>
          </Route>
          <Route path='/checkout'>
            <Header/>
            <CheckoutPage/>
          </Route>
          <Route path='/'>
            <Header/>
            <HomePage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
