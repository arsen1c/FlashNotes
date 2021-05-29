import Todos from './Todos.js';
import TodoDetails from './TodoDetails';
import Navbar from './Navbar.jsx';
import Login from './Login.js';
import Me from './Me.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    	<div className="App">
	        <Navbar />
	        <Switch>
	        	<Route exact path="/">
	        		<Home />
	        	</Route>
	        	<Route exact path="/todos">
	        		<Todos />
	        	</Route>
	        	<Route path="/todos/:id">
	        		<TodoDetails />
	        	</Route>
	        	<Route path="/login">
	        		<Login />
	        	</Route>
	        	<Route path="/me">
	        		<Me />
	        	</Route>
	        </Switch>
	    </div>
    </Router>
  );
}

export default App;
