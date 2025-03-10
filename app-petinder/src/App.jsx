import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./pages/cadastro/index";
import LoginForm from "./pages/login/login";
import DemonstrationForm from "./pages/demonstration/demonstration"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/demonstration" element={<DemonstrationForm />} />
            </Routes>
        </Router>
    );
};

export default App;