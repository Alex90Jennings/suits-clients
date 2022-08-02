import SideSection from './SideSection.js'

function Rules (props) {
    const setIsOpenRules = props.setIsOpenRules
    
    return (
        <div className="modal-container-background three-columns-expand-two">
            <SideSection />
            <div className="modal-container-content center">
                <div className='two-columns-expand-one'>
                    <div></div>
                    <button className="close-modal-button-x button-reset" onClick={() => {setIsOpenRules(false)}}>X</button>
                </div>
                <h1>RULES</h1>
                <h2>SETTING UP THE GAME</h2>
                    <p></p>
                <h2>THE TABLE</h2>
                <h2>HOW TO PLAY</h2>
                    <p>Rules</p>
                    <p>In clockwise order, each play a card to the trick and must follow suit by playing a card of the suit led if held. A player with no card of the suit led may play any card, either discarding or trumping.</p>
                <h2>WHO WINS</h2>
                <p>Get the most points to win</p>
                <p>Click the tabla drum to return to the game</p>
                <button className="close-modal-button-back button-reset" onClick={() => {setIsOpenRules(false)}}>
                    <img className="button-image" src='../assets/diagrams/india/tabla.png' alt='tabla'></img>
                </button>
            </div>
            <SideSection />
        </div>
    )
}

export default Rules;