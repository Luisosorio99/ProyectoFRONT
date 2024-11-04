import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectFormWithTable = () => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({
        titulo: '',
        descripcion: '',
        completada: false,
        fecha_vencimiento: '',
        prioridad: 'media',
        asignado_a: '',
        categoria: '',
        costo_proyecto: ''
    });

    // URL base para las APIs
    const BASE_URL = 'https://proyectoback-1.onrender.com';

    useEffect(() => {
        // Cargar proyectos iniciales
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/proyectos/obtener`);
                setProjects(response.data);
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProject({
            ...project,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/proyectos/crear`, project);
            setProjects([...projects, response.data]); // Añadir el nuevo proyecto a la tabla
            alert('Proyecto creado con éxito');
            // Reiniciar el formulario
            setProject({
                titulo: '',
                descripcion: '',
                completada: false,
                fecha_vencimiento: '',
                prioridad: 'media',
                asignado_a: '',
                categoria: '',
                costo_proyecto: ''
            });
        } catch (error) {
            console.error('Error al crear el proyecto', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Crear Proyecto</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    name="titulo"
                    value={project.titulo}
                    onChange={handleChange}
                    placeholder="Título"
                    required
                    style={inputStyle}
                />
                <textarea
                    name="descripcion"
                    value={project.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    style={textareaStyle}
                />
                <label style={labelStyle}>
                    Completada:
                    <input
                        type="checkbox"
                        name="completada"
                        checked={project.completada}
                        onChange={handleChange}
                        style={checkboxStyle}
                    />
                </label>
                <input
                    type="date"
                    name="fecha_vencimiento"
                    value={project.fecha_vencimiento}
                    onChange={handleChange}
                    placeholder="Fecha de Vencimiento"
                    style={inputStyle}
                />
                <select name="prioridad" value={project.prioridad} onChange={handleChange} style={inputStyle}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
                <input
                    type="text"
                    name="asignado_a"
                    value={project.asignado_a}
                    onChange={handleChange}
                    placeholder="Asignado a"
                    style={inputStyle}
                />
                <select name="categoria" value={project.categoria} onChange={handleChange} style={inputStyle}>
                    <option value="">Selecciona una categoría</option>
                    <option value="clasificación">Clasificación</option>
                    <option value="tipo de tarea">Tipo de Tarea</option>
                    <option value="opcional">Opcional</option>
                </select>
                <input
                    type="number"
                    name="costo_proyecto"
                    value={project.costo_proyecto}
                    onChange={handleChange}
                    placeholder="Costo del Proyecto"
                    step="0.01"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Crear Proyecto</button>
            </form>

            <h3>Lista de Proyectos</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Título</th>
                        <th style={thStyle}>Descripción</th>
                        <th style={thStyle}>Completada</th>
                        <th style={thStyle}>Fecha de Vencimiento</th>
                        <th style={thStyle}>Prioridad</th>
                        <th style={thStyle}>Asignado a</th>
                        <th style={thStyle}>Categoría</th>
                        <th style={thStyle}>Costo del Proyecto</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td style={tdStyle}>{project.titulo}</td>
                            <td style={tdStyle}>{project.descripcion}</td>
                            <td style={tdStyle}>{project.completada ? 'Sí' : 'No'}</td>
                            <td style={tdStyle}>{project.fecha_vencimiento}</td>
                            <td style={tdStyle}>{project.prioridad}</td>
                            <td style={tdStyle}>{project.asignado_a}</td>
                            <td style={tdStyle}>{project.categoria}</td>
                            <td style={tdStyle}>${project.costo_proyecto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectFormWithTable;

// Definición de estilos
const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
};

const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center'
};

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%'
};

const textareaStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '80px',
    width: '100%'
};

const checkboxStyle = {
    marginLeft: '10px'
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
};

const tableStyle = {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse'
};

const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};

const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
};
