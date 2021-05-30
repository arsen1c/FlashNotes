import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AddTodoModal from './AddTodoModal';


export default function Home (props) {
	const [showModal, setshowModal] = useState(false);
	const [collection, setCollection] = useState(props.data);
	// const [deleteMessage, setdeleteMessage] = useState('');	
	const handleModal = (value) => {
		setshowModal(value);
	}

	const handleDelete = (toodId) => {
		console.log('Delete Item Number:', toodId);
		fetch(`http://localhost:4000/api/notes/${toodId}`, {
			method: 'DELETE',
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
			}
		}).then(res => {
			if (!res.ok) {
				return new Error('Error Deleting');
			}
			return res.json();
		}).then(data => {
			console.log(data);
			// setdeleteMessage('Deleted Succesfully!');
			setCollection([...data.notes])
		}).catch(err => {
			console.log(err);
		})
	}	

	return (
		<div className="collection">
			<Header heading="Todos" />
			<div className="addCollection link" onClick={() => handleModal(true)}>
				+
			</div>
			{/*<div>{deleteMessage}</div>*/}
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