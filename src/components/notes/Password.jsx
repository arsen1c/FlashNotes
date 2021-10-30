import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { server } from '../../config';
import { Spinner, SpinnerSmall } from '../animations/Animations';

export default function Password({ setnote }) {
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const { username, link } = useParams();
  const [buttonText, setbuttonText] = useState("Submit")

  const handleChange = (e) => {
    setpassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setbuttonText(<SpinnerSmall />)

    fetch(`${server}/${username}/${link}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
      .then(async (data) => {
        if (!data.ok) {
          throw new Error("Invalid password");
        }
        return await data.json();
      })
      .then(json => {
        setbuttonText("Submit");
        return setnote(() => json);
      })
      .catch(e => {
        console.log(e);
        setbuttonText("Submit");
        return seterror(e.message);
      });
  }
  return (
    <div className="passwordDiv">
      <div className="passwordWarning">
        ⚠️ <span>Protected Note</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Please enter the password to view this note</label>
        <input 
          name="password"
          onChange={handleChange} 
          type="password" 
          value={password}
          placeholder="Password"
        />
        {error && <div className="error">{error}</div>}
        <button>{buttonText}</button>
      </form>
    </div>
  )
}
