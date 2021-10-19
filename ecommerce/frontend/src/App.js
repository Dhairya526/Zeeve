import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import AppProvider from './provider/Store';
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import BuyerDash from './pages/private/BuyerDash';
import SellerDash from './pages/private/SellerDash';
import AddProduct from './pages/private/AddProduct';
import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          {/* Public Routes */}
          <PublicRoute exact path='/' component={Login} />
          <PublicRoute exact path='/signup' component={Signup} />

          {/* Private Routes */}
          <PrivateRoute exact path='/dashboard' buyerComponent={BuyerDash} sellerComponent={SellerDash} />
          <PrivateRoute exact path='/addProduct' sellerComponent={AddProduct} />

          {/* default route and not found route */}
          <Route path="/404" exact component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
