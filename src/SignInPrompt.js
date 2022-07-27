import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";


function SignInPrompt() {
  const { setLoggedInUser, setGameState } = useContext(globalContext)
  const ref = useRef(null);

  const registerUser = () => {
    client
    .post('/user', { username: ref.current.value })
    .then((res) => {
        const user = res.data.data.user
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        setLoggedInUser({user: user})
        setGameState("select lobby")
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
            <div></div>
              <textarea ref={ref} type="text" rows="3" placeholder="type username here"></textarea>
              <button onClick={() => {registerUser()}}>SUBMIT</button>
              <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;