import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Tabs from "./components/Tabs";
import AddNewFieldOnButtonClick_1 from "./page-components/addNewFieldOnButtonClick_1/AddNewFieldOnButtonClick_1";
import AddNewFieldOnButtonClick_2 from "./page-components/addNewFieldOnButtonClick_2/AddNewFieldOnButtonClick_2";
import Analyticsdashboard_1 from "./page-components/analytics-dashboard_1/Analyticsdashboard_1";
import Payment from "./page-components/payment-1/Payment";
import Payment_2 from "./page-components/payment-2/Payment";
import Payment_3 from "./page-components/payment-3/Payment_3";
import ShopifyTabs from "./shopify-projects/ShopifyTabs";

const App = () => {
  return (
    <BrowserRouter>
      {/* {window.location.pathname !== "/" && (
          <div style={{ padding: "20px 0" }}>
            <b>
              <NavLink to="/">Home</NavLink>
            </b>
          </div>
        )} */}
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
        <Route
          path="/analytics-dashboard-1"
          element={<Analyticsdashboard_1 />}
        />

        <Route path="/payment-template-1" element={<Payment />} />

        <Route path="/payment-template-2" element={<Payment_2 />} />

        <Route path="/payment-template-3" element={<Payment_3 />} />

        <Route path="/shopify-project" element={<ShopifyTabs />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
