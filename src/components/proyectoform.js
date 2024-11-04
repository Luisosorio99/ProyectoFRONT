import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ isEditing, projectData }) => {
    const [project, setProject] = useState(projectData || {
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
            if (isEditing) {
                await axios.put(`${BASE_URL}/proyectos/actualizar/${project.id}`, project);
                alert('Proyecto editado con éxito');
            } else { 
                await axios.post(`${BASE_URL}/proyectos/crear`, project);
                alert('Proyecto creado con éxito');
            } 
        } catch (error) {
            console.error('Error al enviar los datos del proyecto', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={headerStyle}>{isEditing ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
            
            <label htmlFor="titulo" style={labelStyle}>Título</label>
            <input
                type="text"
                id="titulo"
                name="titulo"
                value={project.titulo}
                onChange={handleChange}
                placeholder="Título"
                title="Título del proyecto"
                required
                style={inputStyle}
            />
            
            <label htmlFor="descripcion" style={labelStyle}>Descripción</label>
            <textarea
                id="descripcion"
                name="descripcion"
                value={project.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                title="Descripción del proyecto"
                style={textareaStyle}
            />

            <label htmlFor="completada" style={labelStyle}>Completada</label>
            <input
                type="checkbox"
                id="completada"
                name="completada"
                checked={project.completada}
                onChange={handleChange}
                title="Marcar si el proyecto está completado"
                style={checkboxStyle}
            />

            <label htmlFor="fecha_vencimiento" style={labelStyle}>Fecha de Vencimiento</label>
            <input
                type="date"
                id="fecha_vencimiento"
                name="fecha_vencimiento"
                value={project.fecha_vencimiento}
                onChange={handleChange}
                placeholder="Fecha de Vencimiento"
                title="Fecha de vencimiento del proyecto"
                style={inputStyle}
            />

            <label htmlFor="prioridad" style={labelStyle}>Prioridad</label>
            <select
                id="prioridad"
                name="prioridad"
                value={project.prioridad}
                onChange={handleChange}
                title="Prioridad del proyecto"
                style={inputStyle}
            >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
            </select>

            <label htmlFor="asignado_a" style={labelStyle}>Asignado a</label>
            <input
                type="text"
                id="asignado_a"
                name="asignado_a"
                value={project.asignado_a}
                onChange={handleChange}
                placeholder="Asignado a"
                title="Persona asignada al proyecto"
                style={inputStyle}
            />

            <label htmlFor="categoria" style={labelStyle}>Categoría</label>
            <select
                id="categoria"
                name="categoria"
                value={project.categoria}
                onChange={handleChange}
                title="Categoría del proyecto"
                style={inputStyle}
            >
                <option value="">Selecciona una categoría</option>
                <option value="clasificación">Clasificación</option>
                <option value="tipo de tarea">Tipo de Tarea</option>
                <option value="opcional">Opcional</option>
            </select>

            <label htmlFor="costo_proyecto" style={labelStyle}>Costo del Proyecto</label>
            <input
                type="number"
                id="costo_proyecto"
                name="costo_proyecto"
                value={project.costo_proyecto}
                onChange={handleChange}
                placeholder="Costo del Proyecto"
                title="Costo estimado del proyecto"
                step="0.01"
                style={inputStyle}
            />
            
            <button type="submit" style={buttonStyle}>{isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}</button>
        </form>
    );
};

export default ProjectForm;

// Estilos
const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

const headerStyle = {
    textAlign: 'center',
    color: '#333',
};

const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#555',
};

const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const textareaStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '80px',
};

const checkboxStyle = {
    marginTop: '10px',
    alignSelf: 'flex-start',
};

const buttonStyle = {
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
};

buttonStyle[':hover'] = {
    backgroundColor: '#45a049',
};
