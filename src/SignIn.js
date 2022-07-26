import Header from "./Header";
import SignInPrompt from "./SignInPrompt";
// import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  const username = props.username
  const setUsername = props.setUsername

  return (
    <>
      <Header/>
      <main>
        <SignInPrompt username={username} setUsername={setUsername}/>
      </main>
    </>
  );
}

export default SignIn;
