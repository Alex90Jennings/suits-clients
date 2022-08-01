import RenderTable from "./RenderTable"
import { useContext, useState } from "react";
import { globalContext } from './helper/globalContext';


function Table() {
  const { lobbyCode } = useContext(globalContext)
  // const [cardDeck, setCardDeck] = useState([])

  // if (gameState = "generate card deck") {

  // }


  return (
    <>
      <h2>Welcome to Table {lobbyCode}</h2>
      <RenderTable />
    </>
  );
}

export default Table;