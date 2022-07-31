import { useState } from "react";
import Rules from "./Rules.js";
import Profile from "./Profile.js"
import Scoreboard from "./Scoreboard.js";

function Header() {

  const [isOpenRules, setIsOpenRules] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const [isOpenScoreboard, setIsOpenScoreboard] = useState(false)


  return (
    <>
      <header className='three-columns-centered'>
        <div className='three-rows-expand-one-three'>
          <div></div>
          <div className='two-columns-expand-one'>
            <div></div>
            <ul>
              <li>
                <img src='../assets/diagrams/suits/spade-colour.png' className='suits-card-header' alt='spades'></img>
              </li>
              <li>
                <img src='../assets/diagrams/suits/hearts-colour.png' className='suits-card-header' alt='heartss'></img>
              </li>
              <li>
                <img src='../assets/diagrams/suits/diamond-colour.png' className='suits-card-header' alt='diamonds'></img>
              </li>
              <li>
                <img src='../assets/diagrams/suits/club-colour.png' className='suits-card-header' alt='clubs'></img>
              </li>
            </ul>
          </div>
          <div></div>  
        </div>
        <div className='three-rows-expand-one-three'>
          <div></div>
          <h1>SUITS</h1>
          <div></div>
        </div>
        <div className='three-rows-expand-one-three'>
          <div></div>
          <ul>
            <li>
              <button onClick={() => {setIsOpenRules(true)}}>
                RULES
              </button>
            </li>
            <li>
              <button onClick={() => {setIsOpenScoreboard(true)}}>
                SCOREBOARD
              </button>
            </li>
            <li>
              <button onClick={() => {setIsOpenProfile(true)}}>
                PROFILE
              </button>
            </li>
          </ul>
          <div></div>
        </div>
      </header>

      {isOpenRules && <Rules setIsOpenRules={setIsOpenRules}/>}
      {isOpenProfile && <Profile setIsOpenProfile={setIsOpenProfile}/>}
      {isOpenScoreboard && <Scoreboard setIsOpenScoreboard={setIsOpenScoreboard}/>}
    </>
  );
}

export default Header;