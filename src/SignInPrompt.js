import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from '../../../Helper/loggedInUserContext';
import { useContext } from "react";


function SignInPrompt() {
  const { loggedInUser, setLoggedInUser } = useContext(globalContext)
  const ref = useRef(null);

  const registerUser = (username) => {
    client
    .post('/user', { username: username })
    .then((res) => {
        console.log(res.data.data.user.username)
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const handleSubmit = () => {
    console.log(ref.current.value)
    setLoggedInUser({username: ref.current.value})
    //when loggedInUser is updated, registerUser(loggedInUser.username)
  };
    
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