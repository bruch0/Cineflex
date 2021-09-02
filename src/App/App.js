import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from '../Components/Topbar/Topbar';
import Home from '../Pages/Home/Home'
import Schedule from '../Pages/Schedule/Schedule'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Topbar />
			<Switch>
				<Route path="/" exact>
          <Home />
				</Route>
        <Route path="/filme/:idFilme">
          <Schedule />
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
