import { useRef } from "react";
import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignInPrompt() {
  const { loggedInUser, setGameState, setLobbyCode, setIsHost } = useContext(globalContext)
  let navigate = useNavigate();
  const ref = useRef(null);

  const createNewTable = () => {
    let tableId

    client
    .post('/table', { users: [loggedInUser.user] })
    .then((res) => {
        tableId = Number(res.data.data.table.id)
        console.log(tableId)
        setLobbyCode(tableId)
        makeLoggedInUserHost(tableId)
        localStorage.setItem('lobby code', JSON.stringify(res.data.data.table.id));
        navigate(`../lobby/${tableId}`, { replace: true });
        setGameState("waiting lobby")
    })
    .catch((err) => { 
      console.log(err.response)
    });

  };

  const makeLoggedInUserHost = (tableId) => {
    console.log("in make logged in user host")
    client
    .patch(`/user/${loggedInUser.user.id}`, { tableId: tableId, isHost: true })
    .then(() => {
      console.log(`${loggedInUser.user.username} is now host of ${tableId}`)
      setIsHost(true)
    })
    .catch((err) => { 
      console.log(err.response)
    });
  }

  const addUserToLobby = (tableId) => {
    let userId = loggedInUser.user.id
    client
    .patch(`/user/${userId}`, {tableId: tableId})
    .then((res) => {
        setLobbyCode(tableId)
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
        <div className="m-bottom-l">
          <h2>Hi {loggedInUser.user.username}! Would you like make a new lobby or join a lobby with a code:</h2>
          <div className="three-columns-expand-one-three">
            <div></div>
            <div className="four-columns-expand-one-four">
              <div></div>
              <h3>Click on the tuc tuc to create a new lobby: </h3>
              <button className="sign-in-button" onClick={() => {createNewTable()}}>
                <img src="../assets/diagrams/india/tuctuc.png" className="button-image" alt="tuc-tuc"></img>
              </button>
              <div></div>
            </div>
            <div></div>
          </div>
          <div className="four-columns-expand-one-four">
            <div></div>
            <textarea ref={ref} type="text" maxLength={3} className="sign-in-textarea center text-align-center" placeholder="enter lobby code here" onKeyPress={(e) => {e.key === 'Enter' && isValidLobbyCode()}}></textarea>
            <button className="sign-in-button"  onClick={() => {isValidLobbyCode()}}>
              <img src="../assets/diagrams/india/cricket-bat.png" className="button-image" alt="cricket-bat"></img>
            </button>
            <div></div>
          </div>
        </div>
        <div></div>
      </section>
    );
  }
  
  export default SignInPrompt;