import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Navb from "../Navbar"; 
import Home from "../Pages/Home"
import IniciarSesion from "../Pages/IniciarSesion"
import PedirViaje from "../Pages/PedirViaje"
import Registrate from "../Pages/Registrate";
import DarRide from "../Pages/DarRide";
import Olvidemicontraseña from "../Pages/Olvidemicontraseña";
import Bienvenido from "../Pages/Bienvenido";

const Rutas = () => {
    return (
        <div>
            <Router>
            <Navb />    
                <Routes>
                    <Route path="/" element = {<Home/>} />
                    <Route path="/PedirViaje" element = {<PedirViaje/>} />
                    <Route path="/DarRide" element = {<DarRide />} />
                    <Route path="/Olvidemicontraseña" element={<Olvidemicontraseña/>} />       
                    <Route path="/IniciarSesion" element = {<IniciarSesion/>} />
                    <Route path="/Registrate" element = {<Registrate/>} />
                    <Route path="/Bienvenido" element={<Bienvenido/>} />
                </Routes>    
            </Router>
        </div>      
    )
}

export default Rutas;