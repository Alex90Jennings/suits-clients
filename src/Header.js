function Header() {
  return (
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
          <li>RULES</li>
          <li>SCOREBOARD</li>
          <li>PROFILE</li>
        </ul>
        <div></div>
      </div>
    </header>
  );
}

export default Header;