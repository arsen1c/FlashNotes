import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AddTodoModal from './AddTodoModal';

export default function Home (props) {

	const [showModal, setshowModal] = useState(false);
	const [collection, setCollection] = useState(JSON.parse(window.localStorage.getItem("todos")));
	const [error, setError] = useState(null);
	
	const handleModal = (value) => {
		setshowModal(value);
	}

	const handleDelete = (toodId) => {
		collection.map((item, index) => {
			if (item.id === toodId) {
				collection.splice(index, 1);
				window.localStorage.setItem("todos", JSON.stringify(collection));
				setCollection([...collection])
			}
		})
	}	

	if (window.localStorage.getItem("todos")) {
		const collections = window.localStorage.getItem("todos");
	} else {
		window.localStorage.setItem("todos", "[]");
	}	

	return (
		<div className="collection">
			<Header heading="Todos" />
			<div className="addCollection link" onClick={() => handleModal(true)}>
				+
			</div>
			{ error && <div className="error">error</div> }
			<section className="collection-cards-grid">
				{
					collection.map((item, index) => (
						<div className="collection-card" key={item.id}>
							<Link className="link" to={`/todo/${item.id}`}>
								<h3 className="card-title ">
									{ item.title }
								</h3>
							</Link>
							<h3 className="card-description">
								{ item.description }
							</h3>
							<div className="collectionActions">
								<div className="tasks-date">{item.date}</div>
								<span className="delete-btn">
									<i onClick={() => handleDelete(item.id)} id="delete-collection" className="fas fa-trash link"></i>
								</span>
							</div>
						</div>
					))
				}
			</section>
			{ !collection.length > 0 && <div className="empty">Nothing to display...</div> }
			<AddTodoModal onClose={() => handleModal(false)} show={showModal}/>
		</div>
	)
}