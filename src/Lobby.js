// import { globalContext } from './helper/globalContext';
// import { useContext } from "react";
import Header from "./Header";
import RenderPlayers from "./RenderPlayers"

function Lobby() {
  // const { loggedInUser, setLoggedInUser, gameState } = useContext(globalContext)

  return (
    <>
      <Header />
      <RenderPlayers />
      <button>START GAME</button>
    </>
  );
}

export default Lobby;
