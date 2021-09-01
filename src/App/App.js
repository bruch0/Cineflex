import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../Home/Home'
import Topbar from '../Topbar/Topbar';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Topbar />
			<Switch>
				<Route path="/" exact>
          <Home />
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
