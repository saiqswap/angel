import Login from "./pages/Login";
import { isLoggedIn } from "./utils/auth";

//scss
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDialog from "./components/CustomDialog";
import Main from "./pages/Main";
import "./styles/custom.scss";

function App() {
  return (
    <div className="App">
      {isLoggedIn() ? <Main /> : <Login />}
      <ToastContainer />
      <CustomDialog />
    </div>
  );
}

export default App;
