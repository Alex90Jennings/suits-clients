import Header from "./Header";
import SignInPrompt from "./SignInPrompt";
import LobbyPrompt from "./LobbyPrompt"
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function SignIn() {
  const { loggedInUser, setLoggedInUser, gameState } = useContext(globalContext)

  return (
    <>
      <Header/>
      <main>
        {gameState === "sign in" && <SignInPrompt loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}
        {gameState === "select lobby" && <LobbyPrompt loggedInUser={loggedInUser} />}
      </main>
    </>
  );
}

export default SignIn;
