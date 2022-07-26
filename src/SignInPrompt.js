import { useRef, useEffect } from "react";
import client from './utils/client.js';

function SignInPrompt(props) {
  const username = props.username
  const setUsername = props.setUsername
  const ref = useRef(null);

  const registerUser = (username) => {
    console.log(username)
    client
    .post('/user', { username: username })
    .then((res) => {
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
        // navigate('../home', { replace: true });
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const handleSubmit = () => {
    setUsername(ref.current.value)
  };

  useEffect(() => {
    console.log(username)
    registerUser(username)
  },[username])
    
    return (
      <section>
        <h2>Hi, welcome to Suits! Please choose a username:</h2>
        <div>
            <textarea ref={ref} type="text" rows="3" placeholder="type username here"></textarea>
            <button onClick={() => {handleSubmit()}}>SUBMIT</button>
        </div>
      </section>
    );
  }
  
  export default SignInPrompt;