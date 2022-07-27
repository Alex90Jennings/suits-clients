import Header from "./Header";
import SignInPrompt from "./SignInPrompt";
import LobbyPrompt from "./LobbyPrompt"
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function SignIn(props) {
  const { loggedInUser, setLoggedInUser } = useContext(globalContext)
  const lobbyCode = props.lobbyCode
  const setLobbyCode = props.setLobbyCode

  return (
    <>
      <Header/>
      <main>
        {loggedInUser.username === "" && <SignInPrompt loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}
        {loggedInUser.username !== "" && lobbyCode === "" && <LobbyPrompt loggedInUser={loggedInUser} lobbyCode={lobbyCode} setLobbyCode={setLobbyCode}/>}
      </main>
    </>
  );
}

export default SignIn;
