import SideSection from './SideSection.js'

function Profile (props) {
    const setIsOpenProfile = props.setIsOpenProfile
    
    return (
        <div className="modal-container-background three-columns-expand-two">
            <SideSection />
            <div className="modal-container-content center">
                <div className='two-columns-expand-one'>
                    <div></div>
                    <button className="close-modal-button-x button-reset" onClick={() => {setIsOpenProfile(false)}}>X</button>
                </div>
                <h1>PROFILE</h1>
                <h2>Username</h2>
                <h2>Player ID</h2>
                <h2>Player Animal: </h2>
                <p>click the spices to return to the game</p>
                <button className="close-modal-button-back button-reset" onClick={() => {setIsOpenProfile(false)}}>
                    <img className="button-image" src='../assets/diagrams/india/spice.png' alt='spices'></img>
                </button>
            </div>
            <SideSection />
        </div>
    )
}

export default Profile;