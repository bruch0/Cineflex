import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topbar from '../Components/Topbar/Topbar';
import Home from '../Pages/Home/Home';
import Schedule from '../Pages/Schedule/Schedule'
import Seats from '../Pages/Seats/Seats';
import Success from '../Pages/Success/Success'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Topbar />
			<Switch>
				<Route path="/" exact>
          <Home />
				</Route>
        <Route path="/filme/:idMovie" exact component={Schedule} />
        <Route path="/filme/:idMovie/sessao/:idSession" exact component={Seats} />
        <Route path="/sucesso" component={Success} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
