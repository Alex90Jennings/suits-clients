import SideSection from './SideSection.js'

function Scoreboard (props) {
    const setIsOpenScoreboard = props.setIsOpenScoreboard
    
    return (
        <div className="modal-container-background three-columns-expand-two">
            <SideSection />
            <div className="modal-container-content center">
                <div className='two-columns-expand-one'>
                    <div></div>
                    <button className="close-modal-button-x button-reset" onClick={() => {setIsOpenScoreboard(false)}}>X</button>
                </div>
                <h1>SCOREBOARD</h1>
                <p>click the sitar to return to the game</p>
                <button className="close-modal-button-back button-reset" onClick={() => {setIsOpenScoreboard(false)}}>
                    <img className="button-image" src='../assets/diagrams/india/sitar.png' alt='sitar'></img>
                </button>
            </div>
            <SideSection />
        </div>
    )
}

export default Scoreboard;