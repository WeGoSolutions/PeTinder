import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/index/index";
import Cadastro from "./pages/cadastro/cadastro";
import Login from "./pages/login/login";
import DemonstrationForm from "./pages/demonstration/demonstration"
import Initial from "./pages/initial/initial";
import Forms from "./pages/forms/forms";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/initial" element={<Initial />} />
                <Route path="/demonstration" element={<DemonstrationForm />} />
                <Route path="/forms" element={<Forms />} />
            </Routes>
        </Router>
    );
};

export default App;