import { useRef, useEffect } from "react";
import client from './utils/client.js';

function SignInPrompt(props) {
  const username = props.username
  const setUsername = props.setUsername
  const ref = useRef(null);

  const registerUser = (username) => {
    client
    .post('/user', { username: username })
    .then((res) => {
        console.log(res.data.data.user.username)
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
        // navigate('../home', { replace: true });
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const handleSubmit = () => {
    console.log(ref.current.value)
    setUsername(ref.current.value)
  };

  useEffect(() => {
    console.log(username)
    registerUser(username)
  },[username])
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi, welcome to Suits! Please choose a username:</h2>
          <div className="four-columns-expand-one-four">
              <textarea ref={ref} type="text" rows="3" placeholder="type username here"></textarea>
              <button onClick={() => {handleSubmit()}}>SUBMIT</button>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;