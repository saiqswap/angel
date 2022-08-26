import { isLoggedIn } from "./utils/auth";
import Login from "./pages/Login";

//scss
import "react-toastify/dist/ReactToastify.css";
import "./styles/custom.scss";
import { ToastContainer } from "react-toastify";
import Main from "./pages/Main";
import CustomDialog from "./components/CustomDialog";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { _getConfig } from "./actions/settingActions";
import { _getContracts } from "./actions/adminActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getConfig());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn()) dispatch(_getContracts());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoggedIn() ? <Main /> : <Login />}
      <ToastContainer />
      <CustomDialog />
    </div>
  );
}

export default App;
