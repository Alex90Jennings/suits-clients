function Header() {
  return (
    <header>
      <ul className="three-columns-centered">
        <li className="five-columns-expand-five m-left-m">
            <img src="../assets/diagrams/suits/spade-colour.png" className="suits-card-header" alt="spade-colour"></img>
            <img src="../assets/diagrams/suits/hearts-colour.png" className="suits-card-header" alt="hearts-colour"></img>
            <img src="../assets/diagrams/suits/diamond-colour.png" className="suits-card-header" alt="diamond-colour"></img>
            <img src="../assets/diagrams/suits/club-colour.png" className="suits-card-header" alt="club-colour"></img>
        </li>
        <h1>SUITS</h1>
        <ul>
          <li>RULES</li>
          <li>PROFILE</li>
        </ul>
      </ul>
    </header>
  );
}

export default Header;