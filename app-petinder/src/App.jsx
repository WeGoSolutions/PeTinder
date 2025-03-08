import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./pages/cadastro/index";
import LoginForm from "./pages/login/login";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;