import SideSection from './SideSection.js'

function Rules (props) {
    const setIsOpenRules = props.setIsOpenRules
    
    return (
        <div className="modal-container-background three-columns-expand-two">
            <SideSection />
            <div className="modal-container-content center">
                <button className="close-modal-button-x" onClick={() => {setIsOpenRules(false)}}>X</button>
                <h1>RULES</h1>
                <p>Get the most points to win</p>
                <button className="close-modal-button-back" onClick={() => {setIsOpenRules(false)}}>BACK TO GAME</button>
            </div>
            <SideSection />
        </div>
    )
}

export default Rules;