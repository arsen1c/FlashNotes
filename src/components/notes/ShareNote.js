import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { server } from '../../config';
import { Spinner } from '../animations/Animations';
import Password from './Password';

const Note = () => {
  const { username, link } = useParams();
  const [note, setnote] = useState(null);
  const [password, setPassword] = useState(false);

  const handleNotes = (data) => {
    setnote(data);
  }

  useEffect(() => {
    fetch(`${server}/${username}/${link}`)
      .then(async(data) => await data.json())
      .then(json => {
        console.log("JSON",json);
        if (json.msg) {
          return setPassword(true);
        } else {
          setnote(json);
        }
      })
      .catch(e => console.log(e));
  }, [])

  return  (
    <>
      {(!note && !password) && <Spinner />}
      {(password && !note) && <Password setnote={handleNotes}/> }
      {note && <div className="details">
        <div className="details-content">

          <h1 className="details-heading">{note[0].title}</h1>
          <div
            title={new Date(note[0].date).toString()}
            className="details-date tasks-date"
          >
            {new Date(note[0].date).toLocaleDateString()}
          </div>
          <div className="details-description">
            <ReactMarkdown children={note[0].description} />
          </div>
        </div>
      </div>}
    </>
  );
};

export default Note;
