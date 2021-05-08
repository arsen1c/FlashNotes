import Todos from './Todos.js';
import TodoDetails from './TodoDetails';
import Navbar from './Navbar.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    	<div className="App">
	        <Navbar />
	        <Switch>
	        	<Route exact path="/">
	        	</Route>
	        	<Route exact path="/todos">
	        		<Todos />
	        	</Route>
	        	<Route path="/todos/:id">
	        		<TodoDetails />
	        	</Route>
	        </Switch>
	    </div>
    </Router>
  );
}

export default App;
