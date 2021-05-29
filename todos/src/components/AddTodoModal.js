import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function AddTodoModal(props) {

	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);
	const [buttonText, setbuttonText] = useState("Submit")
	const history = useHistory();

	const handleSubmit = (e) => {
		setbuttonText("Adding...")
		try {
			e.preventDefault();
			e.target.querySelector('button').disabled = true;
			
			console.log({
				title, description, date: new Date().toLocaleDateString()
			})
			fetch('http://localhost:4000/api/notes', {
				method: 'POST',
				body: JSON.stringify({ title, description, date: new Date().toLocaleDateString() }),
				headers: { 
					"Content-Type": "application/json",
					"Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
				},
				credentials: 'include',
			}).then(res => {
				return res.json();
			}).then(data =>{
				console.log(data);
				history.go('/collection');
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
			<div className="modal-content">
				<div className="modal-header">
					<h2>📑 Add new todo</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit}>
						<label><h3>Todo title</h3></label>
						<input name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
						<label><h3>Todo description</h3></label>
						<textarea name="description" className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />
						<button className="submit">{buttonText}</button>
					</form>
				</div>
			</div>
		</div>
	)
}