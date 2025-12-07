import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/index/index";
import Cadastro from "./pages/cadastro/cadastro";
import Login from "./pages/login/login";
import DemonstrationForm from "./pages/demonstration/demonstration"
import Initial from "./pages/initial/initial";
import Forms from "./pages/forms/forms";
import Teste from "./pages/Teste";
import Config from "./pages/config/config";
import HomeOng from "./pages/ong/home/home";

import HomeContent from "./pages/ong/home/HomeContent";
import Interessados from "./pages/ong/home/Interessados";
import Dashboard from "./pages/ong/home/Dashboard";
import PetsContent from "./pages/ong/home/PetsContent";
import Configuracao from "./pages/ong/home/Configuracao";
import ConfigSeguranca from "./pages/ong/home/ConfigSeguranca";
// import Configuracao from "./pages/config/config";


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
                <Route path="/teste" element={<Teste />} />
                <Route path="/config" element={<Config />} />


                <Route path="/ong" element={<HomeOng />}>
                    <Route path="home" element={<HomeContent />} />
                    <Route path="interessados" element={<Interessados />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="pets" element={<PetsContent />} />
                    <Route path="configuracao" element={<Configuracao />} />
                    <Route path="configuracao/seguranca" element={<ConfigSeguranca />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;