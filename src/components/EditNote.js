import React, { useState } from 'react';
import { SpinnerSmall } from './Spinner';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function EditNote(props) {
	const [title, setTitle] = useState(props.title ? props.title : "");
	const [description, setDescription] = useState(props.description ? props.description : "");
	const [buttonText, setbuttonText] = useState("Submit");
	const history = useHistory();

	const { id } = useParams();

	const handleSubmit = (e, title, description) => {
		setbuttonText(<SpinnerSmall />)
		try {
			// let todos = todoList;
			// e.target.querySelector('button').disabled = true;
			e.preventDefault();
			
			fetch(`https://react-notes-api.vector2912.repl.co/api/notes/${parseInt(id)}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
				},
				body: JSON.stringify({ title, description })
			}).then(res => {
				return res.json().then(data => {
					// console.log(data);
					return data;
				})
			}).then(data => {
				// console.log('Succes!');
				if (data) {
					setbuttonText("Submit")
					props.onClose();
					history.go(`/notes/${id}`)
				}
			}).catch(err => {
				console.log(err);
			})

			// settodoList(todos);
		} catch (e) {
			console.log(e);
		}
	}

	if (!props.show) {
		return null;
	}

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>📑 Edit Note</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={(e) => handleSubmit(e, title, description)}>
						<label><h3>Title</h3></label>
						<input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
						<label><h3>Description</h3></label>
						<textarea name="description" value={description} className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />
						<button className="submit">{buttonText}</button>
					</form>
				</div>
			</div>
		</div>
	)
}