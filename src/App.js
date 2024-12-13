import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import QuoteListPage from "./components/QuoteListPage.js";
import CreateQuotePage from "./components/CreateQuotePage.js";
import PrivateRoute from "./components/PrivateRoutes.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/quotes" element={<QuoteListPage />} />
          <Route path="/create-quote" element={<CreateQuotePage />} />
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
