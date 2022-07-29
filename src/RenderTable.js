// import client from './utils/client.js';
import RenderCards from './RenderCards'
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderPlayers() {
    const { lobbyCode } = useContext(globalContext)
    // const [host, setHost] = useState(null)

    // function delay(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }

    return (
        <>
            <main>
                <h2>Welcome to Table {lobbyCode}</h2>
                {/* table */}
                {/* notifications */}
                <RenderCards />
            </main>
        </>
      );
    }
    
    export default RenderPlayers;