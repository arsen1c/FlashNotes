import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AddTodoModal from './AddTodoModal';

export default function Home (props) {

	const [showModal, setshowModal] = useState(false);
	const [collection, setCollection] = useState(props.data);
	
	const handleModal = (value) => {
		setshowModal(value);
	}

	const handleDelete = (toodId) => {
		collection.forEach((item, index) => {
			if (item.id === toodId) {
				collection.splice(index, 1);
				window.localStorage.setItem("todos", JSON.stringify(collection));
				setCollection([...collection])
			}
		})
	}	

	return (
		<div className="collection">
			<Header heading="Todos" />
			<div className="addCollection link" onClick={() => handleModal(true)}>
				+
			</div>
			<div className="division">
				<div className="total-todos">Total todos: <span className="total">{collection.length}</span></div>
			</div>
			<section className="collection-cards-grid">
				{
					collection.map((item, index) => (
						<div className={`collection-card ${item.important && "important"}`} key={item.id}>
							<Link className="link" to={`/todos/${item.id}`}>
								<h3 className="card-title">
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
			{ !collection.length > 0 && 
				<div className="empty">
					<h1>It's empty in here...</h1>
					<div>Click on the "+" button to add something</div>
					<i className="fas fa-ghost fa-6x"></i>
				</div> 
			}
			<AddTodoModal onClose={() => handleModal(false)} show={showModal}/>
		</div>
	)
}