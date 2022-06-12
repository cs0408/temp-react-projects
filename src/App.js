import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Tabs from "./components/Tabs";
import AddNewFieldOnButtonClick_1 from "./page-components/addNewFieldOnButtonClick_1/AddNewFieldOnButtonClick_1";
import AddNewFieldOnButtonClick_2 from "./page-components/addNewFieldOnButtonClick_2/AddNewFieldOnButtonClick_2";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {window.location.pathname !== "/" && (
          <div style={{ padding: "20px 0" }}>
            <b>
              <NavLink to="/">Home</NavLink>
            </b>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Tabs />} />
          <Route
            path="/add-new-field-on-button-click-1"
            element={<AddNewFieldOnButtonClick_1 />}
          />
          <Route
            path="/add-new-field-on-button-click-2"
            element={<AddNewFieldOnButtonClick_2 />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
