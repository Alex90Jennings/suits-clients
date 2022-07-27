import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";


function SignInPrompt() {
  const { setLoggedInUser } = useContext(globalContext)
  const ref = useRef(null);

  const registerUser = () => {
    console.log("ref value: ", ref.current.value)
    client
    .post('/user', { username: ref.current.value })
    .then((res) => {
        const user = res.data.data.user
        console.log("user: ", user)
        console.log("username: ", user.username)
        localStorage.setItem('loggedInUser', JSON.stringify(user.username));
        setLoggedInUser({user: user})
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi, welcome to Suits! Please choose a username:</h2>
          <div className="four-columns-expand-one-four">
              <textarea ref={ref} type="text" rows="3" placeholder="type username here"></textarea>
              <button onClick={() => {registerUser()}}>SUBMIT</button>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;