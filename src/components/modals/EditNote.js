import React, { useState } from 'react';
import { SpinnerSmall } from '../Animations';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function EditNote(props) {
	const [title, setTitle] = useState(props.title ? props.title : "");
	const [description, setDescription] = useState(props.description ? props.description : "");
	const [buttonText, setbuttonText] = useState("Submit");
	const history = useHistory();
	const [markdown, setMarkdown] = useState(false);
	const [markdownButton, setMarkdownButton] = useState('Enable preview');
	const [previewButton, setpreviwButton] = useState('');

	// const localhost = 'http://localhost:4000/api/notes';
 	const server = 'https://react-notes-api.vector2912.repl.co/api/notes';

	const { id } = useParams();

	const handleMarkdownToggle = (e) => {
		e.preventDefault();
		setMarkdown(!markdown);

		if (!markdown) {
			setMarkdownButton('Disable preview');
			setpreviwButton('-slash');
		} else {
			setMarkdownButton('Enable preview');
			setpreviwButton('');
		}
		console.log('Markdown:', markdown);
	}

	const handleSubmit = (e, title, description) => {
		setbuttonText(<SpinnerSmall />)
		try {
			e.preventDefault();
				
			fetch(`${server}/${parseInt(id, 10)}`, {
				method: 'PUT',
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, description }),
			}).then(res => {
				return res.json().then(data => {
					return data;
				})
			}).then(data => {
				if (data) {
					setbuttonText("Submit")
					props.onClose();
					history.go(`/notes/${id}`)
				}
			}).catch(err => {
				console.log(err);
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
					<h2><span role="img" aria-label="note">📑</span> Edit Note</h2>
					<span onClick={props.onClose} className="close-modal-btn"> Close</span>
				</div>
				<div className="modal-body">
					<form onSubmit={(e) => handleSubmit(e, title, description)}>
						<label><h3>Title</h3></label>
						<input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your cool title..." required />
						<div className="desc">
							<label><h3>Description</h3></label>
							<span className="toggle-preview-text">{markdownButton} <i className={`fas fa-eye${previewButton} toggle-preview`} onClick={(e) => handleMarkdownToggle(e)}></i></span>
						</div>
						{!markdown && <textarea name="description" value={description} className="textarea" onChange={(e) => setDescription(e.target.value)} placeholder="Your cool description..." />}
						{markdown && <ReactMarkdown className="markdown-preview" children={description}/>}
						<p className="learn-more">Learn more about <a href="https://www.markdownguide.org/basic-syntax/" className="link">Markdown</a></p>
						<button className="submit">{buttonText}</button>
					</form>
				</div>
			</div>
		</div>
	)
}