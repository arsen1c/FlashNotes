import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { SpinnerSmall } from '../animations/Animations';
import ReactMarkdown from 'react-markdown';
import { server } from '../../config';

export default function AddTodoModal(props) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState('Your cool note...');
  const [buttonText, setbuttonText] = useState('Submit');
  const [markdown, setMarkdown] = useState(false);
  const [markdownButton, setMarkdownButton] = useState('Enable preview');
  const [previewButton, setpreviwButton] = useState('');

  const history = useHistory();

  const { data, error, isPending } = useFetch('/notes');

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
  };

  const handleSubmit = (e) => {
    setbuttonText(<SpinnerSmall />);
    try {
      e.preventDefault();
      e.target.querySelector('button').disabled = true;
      const id =
        !data.data.notes.length > 0
          ? 1
          : data.data.notes[data.data.notes.length - 1].id + 1;
      fetch(`${server}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          id,
          title,
          description,
          date: new Date().getTime(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          history.go('/notes');
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <span role="img" aria-label="note">
                📑
              </span>{' '}
              New Note
            </h2>
            <span onClick={props.onClose} className="close-modal-btn">
              {' '}
              Close
            </span>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label>
                <h3>Title</h3>
              </label>
              <input
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your cool title..."
                required
              />
              <div className="desc">
                <label>
                  <h3>Description</h3>
                </label>
                <span className="toggle-preview-text">
                  {markdownButton}{' '}
                  <i
                    className={`fas fa-eye${previewButton} toggle-preview`}
                    onClick={(e) => handleMarkdownToggle(e)}
                  ></i>
                </span>
              </div>
              {!markdown && (
                <textarea
                  name="description"
                  className="textarea"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Your cool description..."
                  value={description}
                />
              )}
              {markdown && (
                <ReactMarkdown
                  className="markdown-preview"
                  children={description}
                />
              )}
              <p className="learn-more">
                Learn more about{' '}
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  className="link"
                >
                  Markdown
                </a>
              </p>
              <button className="submit">{buttonText}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
