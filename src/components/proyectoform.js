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
                await axios.put(`/api/proyecto/actualizar/${project.id}`, project);
                alert('Proyecto editado con éxito');
            } else { 
                await axios.post('/api/proyecto/crear', project);
                alert('Proyecto creado con éxito');
            } 
        } catch (error) {
            console.error('Error al enviar los datos del proyecto', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={headerStyle}>{isEditing ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
            
            <label style={labelStyle}>Título</label>
            <input
                type="text"
                name="titulo"
                value={project.titulo}
                onChange={handleChange}
                placeholder="Título"
                required
                style={inputStyle}
            />
            
            <label style={labelStyle}>Descripción</label>
            <textarea
                name="descripcion"
                value={project.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                style={textareaStyle}
            />

            <label style={labelStyle}>Completada</label>
            <input
                type="checkbox"
                name="completada"
                checked={project.completada}
                onChange={handleChange}
                style={checkboxStyle}
            />

            <label style={labelStyle}>Fecha de Vencimiento</label>
            <input
                type="date"
                name="fecha_vencimiento"
                value={project.fecha_vencimiento}
                onChange={handleChange}
                style={inputStyle}
            />

            <label style={labelStyle}>Prioridad</label>
            <select name="prioridad" value={project.prioridad} onChange={handleChange} style={inputStyle}>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
            </select>

            <label style={labelStyle}>Asignado a</label>
            <input
                type="text"
                name="asignado_a"
                value={project.asignado_a}
                onChange={handleChange}
                placeholder="Asignado a"
                style={inputStyle}
            />

            <label style={labelStyle}>Categoría</label>
            <select name="categoria" value={project.categoria} onChange={handleChange} style={inputStyle}>
                <option value="">Selecciona una categoría</option>
                <option value="clasificación">Clasificación</option>
                <option value="tipo de tarea">Tipo de Tarea</option>
                <option value="opcional">Opcional</option>
            </select>

            <label style={labelStyle}>Costo del Proyecto</label>
            <input
                type="number"
                name="costo_proyecto"
                value={project.costo_proyecto}
                onChange={handleChange}
                placeholder="Costo del Proyecto"
                step="0.01"
                style={inputStyle}
            />
            
            <button type="submit" style={buttonStyle}>{isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}</button>
        </form>
    );
};

export default ProjectForm;

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
