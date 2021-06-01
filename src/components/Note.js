import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import EditNote from './EditNote';
import React from 'react';

const Note = ({ notes, id }) => {
	const history = useHistory();
	const [showModal, setshowModal] = useState(false);
	
	const handleBackButton = () => {
		history.push("/notes");
	}
	const handleModal = (value) => {
		setshowModal(value);
	}

	// Get note with proper id
	const note = notes.filter((item, index) => {
		return item.id === parseInt(id, 10);
	});

	return note.length ? (
		<div className="details">
			<div className="details-content">
				<div onClick={() => handleModal(true)} className="edit"><i className="far fa-edit fa-2x link"></i></div>
				<i className="fas fa-arrow-left fa-2x" onClick={handleBackButton}></i>			
				<h1 className="details-heading">{note[0].title}</h1>
				<div className="details-date tasks-date">{new Date(note[0].date).toLocaleDateString()}</div>	
				<div className="details-description">
					<ReactMarkdown  children={note[0].description} />
				</div>
				<EditNote title={note[0].title} description={note[0].description} id={note[0].id} onClose={() => handleModal(false)} show={showModal}/> 
			</div>
		</div>
	) : (
		<div><div>404 Not Found!</div></div>
	)
}


export default Note;