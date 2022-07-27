import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function SignInPrompt(props) {
  const setLobbyCode = props.setLobbyCode
  const { loggedInUser } = useContext(globalContext)
  const ref = useRef(null);


  const createNewTable = () => {
    console.log(loggedInUser)
    client
    .post('/table', { Users: [loggedInUser.user] })
    .then((res) => {
        console.log(res.data.data.table.id)
        localStorage.setItem('lobby code', JSON.stringify(res.data.data.table.id));
        // navigate('../home', { replace: true });
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  // const addUserToLobby = ( id ) => {
  //   client
  //   .patch('/user', { id: id })
  //   .then((res) => {
  //       console.log(res.data.data.user.username)
  //       localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user.username));
  //       // navigate('../home', { replace: true });
  //   })
  //   .catch((err) => { 
  //     console.log(err.response)
  //   });
  // };

  const handleLobbyCodeSubmit = (id) => {
    console.log(ref.current.value)
    if (!isValidLobbyCode(id)) return false
    //patch user lobbyId
    setLobbyCode(ref.current.value)
  };

  const isValidLobbyCode = (id) => {
    client
    .get(`/table/${id}`)
    .then((res) => {
      console.log(res.status)
      if(res.status === "error") return false
      localStorage.setItem('lobby code', JSON.stringify(res.data.data.table.id));
      return true
    })
  }
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi {loggedInUser.username}! Would you like to create a new lobby and send a code to your friends, or join a lobby they created with their code:</h2>
          <button onClick={() => {createNewTable()}}>CREATE NEW LOBBY</button>
          <div className="four-columns-expand-one-four">
            <div></div>
            <textarea ref={ref} type="text" rows="3" placeholder="enter lobby code here"></textarea>
            <button onClick={() => {handleLobbyCodeSubmit({ref})}}>SUBMIT LOBBY CODE</button>
            <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;