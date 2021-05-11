import { Link } from 'react-router-dom';

export default function Navbar (props) {
	return (
		<nav>
			<h1 className="logo">TODO</h1>
			<div className="links">
				<Link to="/" className="link">Home</Link>
				<Link to="/todos" className="link">Todos</Link>
				<a href="https://github.com/arsen1c/React-Todo" target="_blank" rel="noreferrer"><i className="fab fa-github github "></i></a>
			</div>
		</nav>
	)
}