import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import BuyerDash from './pages/private/BuyerDash';
import SellerDash from './pages/private/SellerDash';
import UserState from './provider/userContext';


function App() {
  return (
    <UserState>
      <Router>
        <Switch>

          {/* Public Routes */}
          <PublicRoute exact path='/' component={Login} />
          <PublicRoute exact path='/signup' component={Signup} />

          {/* Private Routes */}
          <PrivateRoute exact path='/dashboard' buyerComponent={BuyerDash} sellerComponent={SellerDash} />
        </Switch>
      </Router>
    </UserState>
  );
}

export default App;
