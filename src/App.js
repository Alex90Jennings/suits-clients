import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
// import Lobby from "./Lobby";
// import Table from "./Table";

function App() {
  const [username, setUsername] = useState("")

  return(
    <>
      <main className='center-wrapper'>
        <Routes>
          <Route path="/" element={<SignIn username={username} setUsername={setUsername} />} />
          {/* <Route path="/lobby" element={<Lobby />}/>
          <Route path="/table" element={<Table />}/> */}
        </Routes>
      </main>
    </>
  )
}

export default App;
