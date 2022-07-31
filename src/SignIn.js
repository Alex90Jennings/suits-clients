import SignInPrompt from "./SignInPrompt";
import LobbyPrompt from "./LobbyPrompt"
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function SignIn() {
  const { gameState } = useContext(globalContext)

  window.localStorage.clear();

  return (
    <>
      <main className='center-wrapper'>
          {gameState === 'sign in' && <SignInPrompt />}
          {gameState === 'select lobby' && <LobbyPrompt />}
      </main>
    </>
  );
}

export default SignIn;
