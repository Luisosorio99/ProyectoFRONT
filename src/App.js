import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectForm from './components/proyectoform.js';

function App() {
    return (
        <Router>
            <div>
                <h1>Gestión de Proyectos</h1>
                <Routes>
                    <Route path="/" element={<ProjectForm isEditing={false} />} />
                    <Route path="/editar/:id" element={<ProjectForm isEditing={true} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
