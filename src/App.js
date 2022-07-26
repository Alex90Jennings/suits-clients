import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
// import Lobby from "./Lobby";
// import Table from "./Table";

function App() {
  return(
    <>
      <main className='center-wrapper'>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* <Route path="/lobby" element={<Lobby />}/>
          <Route path="/table" element={<Table />}/> */}
        </Routes>
      </main>
    </>
  )
}

export default App;
