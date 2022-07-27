import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignInPrompt() {
  const { loggedInUser, setGameState } = useContext(globalContext)
  let navigate = useNavigate();
  const ref = useRef(null);

  const createNewTable = () => {
    client
    .post('/table', { Users: [loggedInUser.user] })
    .then((res) => {
        const tableId = Number(res.data.data.table.id)
        localStorage.setItem('lobby code', JSON.stringify(res.data.data.table.id));
        navigate(`../lobby/${tableId}`, { replace: true });
        setGameState("waiting lobby")
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const addUserToLobby = (tableId) => {
    let userId = loggedInUser.user.id
    client
    .patch(`/user/${userId}`, {tableId: tableId})
    .then((res) => {
        localStorage.setItem('lobby code', JSON.stringify(res.data.data.user.tableId));
        navigate(`../lobby/${tableId}`, { replace: true });
        setGameState("waiting lobby")
    })
    .catch((err) => { 
      console.log(err.response)
    });
  };

  const isValidLobbyCode = () => {
    let tableId = ref.current.value
    client
    .get(`/table/${tableId}`)
    .then(() => {
      addUserToLobby(tableId)
    })
    .catch((err) => {
      console.log("did not find table", err)
    });
  }
    
    return (
      <section className="three-columns-expand-one-three">
        <div></div>
        <div>
          <h2>Hi {loggedInUser.user.username}! Would you like to create a new lobby and send a code to your friends, or join a lobby they created with their code:</h2>
          <div className="three-columns-expand-one-three">
            <div></div>
            <button onClick={() => {createNewTable()}}>CREATE NEW LOBBY</button>
            <div></div>
          </div>
          <div className="four-columns-expand-one-four">
            <div></div>
            <textarea ref={ref} type="text" rows="3" placeholder="enter lobby code here"></textarea>
            <button onClick={() => {isValidLobbyCode()}}>SUBMIT LOBBY CODE</button>
            <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;