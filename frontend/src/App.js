import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import ProductsPage from "./components/ProductsPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import OrdersPage from "./components/OrdersPage";
import OrdersDetails from "./components/OrderDetails";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            { !user && window.location.pathname == '/' &&
             history.push('/splash') }
            { user && window.location.pathname == '/'  &&
             history.push('/orders')}
          </Route>
          <Route path='/splash' component={SplashPage}/>
          <Route path='/products' component={ProductsPage}/>
          <Route exact path='/orders' component={OrdersPage}/>
          <Route path='/orders/:orderId' component={OrdersDetails}/>
        </Switch>
      )}
    </>
  );
}

export default App;
