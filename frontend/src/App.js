import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import ProductsPage from "./components/ProductsPage";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";

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
            { !user &&
             history.push('/splash') }
            { user &&
             history.push('/products')}
          </Route>
          <Route path='/splash' component={SplashPage}/>
          <Route path='/products' component={ProductsPage}/>
        </Switch>
      )}
    </>
  );
}

export default App;
