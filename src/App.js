import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProjectForm from './components/proyectoform';
import ProjectSearch from './components/searchproyecto';
import ProjectFormWithTable from './components/proyectolist';

function App() {
    return (
        <Router>
            <div>
               <center> <h1>Gestión de Proyectos</h1></center>
               <center> <nav>
                    <Link to="/">Crear Proyecto</Link> |{" "}
                    <Link to="/buscar">Buscar Proyecto</Link> |{" "}
                    
                </nav>
                </center>
                <Routes>
                    <Route path="/" element={<ProjectForm isEditing={false} />} />
                    <Route path="/editar/:id" element={<ProjectForm isEditing={true} />} />
                    <Route path="/buscar" element={<ProjectSearch />} />
                    <Route path="/proyectos" element={<ProjectFormWithTable />} /> {/* Ruta para la tabla */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;


