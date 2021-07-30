import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import AddNoteModal from '../modals/AddNoteModal';

export default function Home (props) {
	const [showModal, setshowModal] = useState(false);
	const [collection, setCollection] = useState([...props.data].reverse());

	const handleModal = (value) => {
		setshowModal(value);
	}

	const handleDelete = (e, noteId) => {
		const answer = window.confirm('Do you want to delete this note?');	

		if (answer) {
			const parentElement = e.target.parentElement;
			parentElement.parentElement.parentElement.style.opacity = "0.5";
			parentElement.innerText = 'Deleting...';
			fetch(`http://localhost:4000/api/notes/${noteId}`, {
				method: 'DELETE',
			}).then(res => {
				if (!res.ok) {
					parentElement.innerText = 'Error Deleting';
					return new Error('Error Deleting');
				}
				return res.json();
			}).then(data => {
				setCollection([...data.notes].reverse())
			}).catch(err => {
				console.log(err);
			})
		}
	}	

	return (
		<div className="collection">
			<Header heading="Notes" username={props.username}/>
			<div className="addCollection link" onClick={() => handleModal(true)}>
				+
			</div>
			<div className="division">
				<div className="total-notes">Total Notes: <span className="total">{collection.length}</span></div>
			</div>
			<section className="collection-cards-grid">
				{
					collection.map((item, index) => (
						<div className={`collection-card ${item.important && "important"}`} key={item.id}>
							<Link className="link" to={`/notes/${item.id}`}>
								<h3 className="card-title">
									{ item.title }
								</h3>
							</Link>
							<h3 className="card-description">
								{ item.description }
							</h3>
							<div className="collectionActions">
								<div title={new Date(item.date).toString()} className="tasks-date">{new Date(item.date).toLocaleDateString()}</div>
								<span className="delete-btn">
									<i onClick={(e) => handleDelete(e, item.id)} id="delete-collection" className="fas fa-trash link"></i>	
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
			<AddNoteModal onClose={() => handleModal(false)} show={showModal}/>
		</div>
	) 
}