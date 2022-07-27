import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from '../../../Helper/loggedInUserContext';
import { useContext } from "react";

function SignInPrompt(props) {
  const lobbyCode = props.lobbyCode
  const setLobbyCode = props.setLobbyCode
  const { loggedInUser, setLoggedInUser } = useContext(globalContext)
  const ref = useRef(null);


  const createNewTable = () => {
    client
    .post('/table', { users: [loggedInUser] })
    .then((res) => {
        console.log(res.data.data.user.username)
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
        // navigate('../home', { replace: true });
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const addUserToLobby = ( id ) => {
    client
    .patch('/user', { username: username })
    .then((res) => {
        console.log(res.data.data.user.username)
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
        // navigate('../home', { replace: true });
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const handleLobbyCodeSubmit = () => {
    console.log(ref.current.value)
    if (!isValidLobbyCode) return false
    //patch user lobbyId
    setLobbyCody(ref.current.value)
  };

  const isValidLobbyCode = () => {
    //cycle through lobby codes
    //if no match, return false
    //if match, return true
  }

  const addUserToLobbyId = ( username ) => {
    //fetch id from username
    
  }
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi ${loggedInUser.username}! Would you like to create a new lobby and send a code to your friends, or join a lobby they created with their code:</h2>
          <button onClick={() => {createNewTable()}}>CREATE NEW LOBBY</button>
          <div className="four-columns-expand-one-four">
            <div></div>
            <textarea ref={ref} type="text" rows="3" placeholder="enter lobby code here"></textarea>
            <button onClick={() => {handleLobbyCodeSubmit()}}>SUBMIT LOBBY CODE</button>
            <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;