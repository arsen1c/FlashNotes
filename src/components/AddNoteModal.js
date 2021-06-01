import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { SpinnerSmall } from './Animations';

export default function AddTodoModal(props) {
	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const [buttonText, setbuttonText] = useState("Submit")
	const history = useHistory();

	const { data, error, isPending } = useFetch('https://react-notes-api.vector2912.repl.co/api/notes', JSON.parse(localStorage.getItem('jwt')));
 	
	const handleSubmit = (e) => {
		setbuttonText(<SpinnerSmall />)
		try {
			e.preventDefault();
			e.target.querySelector('button').disabled = true;
			const id = !data.data.notes.length > 0 ? 1 : data.data.notes[data.data.notes.length - 1].id + 1;
			fetch('https://react-notes-api.vector2912.repl.co/api/notes', {
				method: 'POST',
				body: JSON.stringify({ id, title, description, date: new Date().getTime() }),
				headers: { 
					"Content-Type": "application/json",
					"Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
				},
				credentials: 'include',
			}).then(res => {
				return res.json();
			}).then(data =>{
				console.log(data);
				history.go('/notes');
			}).catch(err => {
				console.log(err.message);
			})

		} catch (e) {
			console.log(e);
		}
	}

	if (!props.show) {
		return null;
	}

	return (
		<div className="modal">
			{ error && <div>{ error }</div> }
			{ isPending &&  <div>Loading...</div> }
			{ data && (
				<div className="modal-content">
					<div className="modal-header">
						<h2>📑 New Note</h2>
						<span onClick={props.onClose} className="close-modal-btn"> Close</span>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							<label><h3>Title</h3></label>
							<input name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
							<label><h3>Description</h3></label>
							<textarea name="description" className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />
							<p className="learn-more">Learn more about <a href="https://www.markdownguide.org/basic-syntax/" className="link">Markdown</a></p>
							<button className="submit">{buttonText}</button>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}