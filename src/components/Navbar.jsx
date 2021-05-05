import { Link } from 'react-router-dom';

export default function Navbar (props) {
	return (
		<nav>
			<Link className="link" to="/">
				<h1 className="logo">TODO</h1>
			</Link>
			<div className="links">
				<Link to="/todos" className="link">Todos</Link>
			</div>
		</nav>
	)
}