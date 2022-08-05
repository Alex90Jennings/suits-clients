// import RenderCards from "./RenderCards.js";
// import RenderTricksWonInRound from "./RenderTricksWonInRound.js"
// import { useContext } from "react";
// import { globalContext } from './helper/globalContext';


// function TableForMoreThanTwoPlayers() {
//   const { playerList, loggedInUser, cardPlayedThisRound } = useContext(globalContext)

//   const findIndexOfLoggedInUser = () => {
//     for (let i = 0; i < playerList.length; i++){
//       if (playerList[i].user.id === loggedInUser.user.id) return i
//     }
//   }

//   const shiftIndex = (oldIndex) => {
//     const shift = findIndexOfLoggedInUser()
//     let newIndex = oldIndex + shift

//     if (newIndex > playerList.length - 1){
//       newIndex = newIndex-playerList.length
//     }
//     return newIndex
//   }


//   return (
//     <>
//       <div className="table-rectangle center">
//         <div className="three-rows-expand-one-three m-left-l">
//           <div></div>
//           <ul className="center">
//             {playerList.length > 2 && (
//               <li id="player3" className="card">
//                 <p>{playerList[shiftIndex(2)].user.username.toUpperCase()}</p>
//                 <img className="animal center m-top-m" src={`../assets/diagrams/india/${shiftIndex(2)}.png`} alt="elephant"></img>
//                 <RenderTricksWonInRound />
//                 {cardPlayedThisRound === "" && (<img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>)}
//               </li>
//             )}
//             {playerList.length > 3 && (
//               <li id="player4" className="card">
//                 <p>{playerList[shiftIndex(3)].user.username.toUpperCase()}</p>
//                 <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(3)}.png`} alt="cobra"></img>
//                 <RenderTricksWonInRound />
//                 <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
//               </li>
//             )}
//             {playerList.length > 4 && (
//               <li id="player5" className="card">
//                 <p>{playerList[shiftIndex(4)].user.username.toUpperCase()}</p>
//                 <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(4)}.png`} alt="cow"></img>
//                 <RenderTricksWonInRound />
//                 <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
//               </li>             
//             )}
//           </ul>
//           <div></div>
//         </div>
//         <div className="three-rows-expand-one-three m-left-l">
//           <div></div>
//           <ul className="center">
//             <li id="player2" className="card">
//               <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
//               <RenderTricksWonInRound />
//               <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(1)}.png`} alt="monkey"></img>
//               <p>{playerList[shiftIndex(1)].user.username.toUpperCase()}</p>
//             </li>
//             <li id="player1" className="card">
//               <img className="playing-card center" src="../assets/cards/QH.png" alt="card"></img>
//               <RenderTricksWonInRound />
//               <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(0)}.png`} alt="tiger"></img>
//               <p>{playerList[shiftIndex(0)].user.username.toUpperCase()}</p>
//             </li>
//             {playerList.length > 5 && (
//               <li id="player6" className="card">
//                 <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
//                 <RenderTricksWonInRound />
//                 <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(5)}.png`} alt="crocodile"></img>
//                 <p>{playerList[shiftIndex(5)].user.username.toUpperCase()}</p>
//               </li>             
//             )}
//           </ul>
//           <div></div>
//         </div>
//       </div>
//       <div className="three-columns-expand-one-three m-bottom-xl">
//         <div></div>
//         <RenderCards />
//         <div></div>
//       </div>
//     </>
//   );
// }

// export default TableForMoreThanTwoPlayers;