import { useRef, useEffect } from "react";
import client from './utils/client.js';

function SignInPrompt(props) {
  const lobbyCody = props.lobbyCody
  const setLobbyCody = props.setLobbyCody
  const username = props.username
  const ref = useRef(null);

//   const registerLobby = (username) => {
//     client
//     .post('/user', { username: username })
//     .then((res) => {
//         console.log(res.data.data.user.username)
//         localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
//         // navigate('../home', { replace: true });
//     })
//     .catch((err) => { 
//       console.log(err.response)
//     });
//   };

//   const addUserToLobby = ( id ) => {
//     client
//     .patch('/user', { username: username })
//     .then((res) => {
//         console.log(res.data.data.user.username)
//         localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
//         // navigate('../home', { replace: true });
//     })
//     .catch((err) => { 
//       console.log(err.response)
//     });
//   };

  const handleSubmit = () => {
    console.log(ref.current.value)
    setUsername(ref.current.value)
  };
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi ${username}! Would you like to create a new lobby and send a code to your friends, or join a lobby they created with their code:</h2>
          <div className="four-columns-expand-one-four">
            <div></div>
            <textarea ref={ref} type="text" rows="3" placeholder="enter lobby code here"></textarea>
            <button onClick={() => {handleSubmit()}}>SUBMIT</button>
            <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;