import { useAuth } from "./common/contexts/authProvider/useAuth";

function App() {
  const token = useAuth().token;

  console.log(token);
  return <div>App</div>;
}

export default App;
