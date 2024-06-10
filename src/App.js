import "./App.css";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="content">
      <img src={logo} alt="megapacks.fun" className="logo" />
      <div>
        <h1 className="title">Megapacks.fun</h1>
        <p>Se você não for redirecionado automaticamente, clique nesse <a href="http://megapacks.fun">link para o novo site</a>.</p>
      </div>
    </div>
  );
}

export default App;
