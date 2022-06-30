import './App.css';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import PokemonCreated from './components/PokemonCreated'
import PokemonDetail from './components/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/pokemons' component={PokemonCreated}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/home/:id' component={PokemonDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
