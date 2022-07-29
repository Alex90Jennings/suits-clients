import Header from "./Header";
import RenderTable from "./RenderTable"
// import { useContext, useState } from "react";
// import { globalContext } from './helper/globalContext';


function Table() {
  // const { gameState, setGameState } = useContext(globalContext)
  // const [cardDeck, setCardDeck] = useState([])

  // if (gameState = "generate card deck") {

  // }


  return (
    <>
      <Header />
      <RenderTable />
    </>
  );
}

export default Table;