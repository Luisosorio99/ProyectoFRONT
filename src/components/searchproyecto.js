import React, { useState } from 'react';
import axios from 'axios';

const ProjectSearch = () => {
  const [id, setId] = useState('');
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({});

  // URL base para las APIs
  const BASE_URL = 'https://proyectoback-1.onrender.com';

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/proyectos/${id}`);
      setProject(response.data.proyecto);
    } catch (error) {
      console.error('Error al buscar proyecto', error);
      setProject(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/proyectos/eliminar/${id}`);
      alert('Proyecto eliminado con éxito');
      setProject(null);
      setId('');
    } catch (error) {
      console.error('Error al eliminar proyecto', error);
    }
  };

  const handleEdit = () => {
    setUpdatedProject(project);
    setIsEditing(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject({ ...updatedProject, [name]: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/proyectos/actualizar/${id}`, updatedProject);
      alert('Proyecto actualizado con éxito');
      setProject(updatedProject);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar proyecto', error);
    }
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

  return (
    <div style={containerStyle}>
      <h2>Buscar Proyecto</h2>
      <form onSubmit={handleSearch} style={formStyle}>
        <input
          type="text"
          placeholder="Ingrese ID de proyecto"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Buscar</button>
      </form>
      {project && (
        <div style={detailsStyle}>
          <h3>Detalles del Proyecto</h3>
          <p><strong>Título:</strong> {project.titulo}</p>
          <p><strong>Descripción:</strong> {project.descripcion}</p>
          <p><strong>Completada:</strong> {project.completada ? 'Sí' : 'No'}</p>
          <p><strong>Fecha de Vencimiento:</strong> {project.fecha_vencimiento}</p>
          <p><strong>Prioridad:</strong> {project.prioridad}</p>
          <p><strong>Asignado a:</strong> {project.asignado_a}</p>
          <p><strong>Categoría:</strong> {project.categoria}</p>
          <p><strong>Costo del Proyecto:</strong> ${project.costo_proyecto}</p>
          <button onClick={handleEdit} style={buttonStyle}>Actualizar</button>
          <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: 'red' }}>Eliminar</button>
        </div>
      )}

      {isEditing && (
        <div style={modalStyle}>
          <h3>Actualizar Proyecto</h3>
          <form onSubmit={handleUpdateSubmit} style={formStyle}>
            <input
              type="text"
              name="titulo"
              value={updatedProject.titulo}
              onChange={handleUpdateChange}
              placeholder="Título"
              style={inputStyle}
            />
            <textarea
              name="descripcion"
              value={updatedProject.descripcion}
              onChange={handleUpdateChange}
              placeholder="Descripción"
              style={textareaStyle}
            />
            <input
              type="date"
              name="fecha_vencimiento"
              value={updatedProject.fecha_vencimiento}
              onChange={handleUpdateChange}
              style={inputStyle}
            />
            <select
              name="prioridad"
              value={updatedProject.prioridad}
              onChange={handleUpdateChange}
              style={inputStyle}
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
            <input
              type="text"
              name="asignado_a"
              value={updatedProject.asignado_a}
              onChange={handleUpdateChange}
              placeholder="Asignado a"
              style={inputStyle}
            />
            <select
              name="categoria"
              value={updatedProject.categoria}
              onChange={handleUpdateChange}
              style={inputStyle}
            >
              <option value="clasificación">Clasificación</option>
              <option value="tipo de tarea">Tipo de Tarea</option>
              <option value="opcional">Opcional</option>
            </select>
            <input
              type="number"
              name="costo_proyecto"
              value={updatedProject.costo_proyecto}
              onChange={handleUpdateChange}
              placeholder="Costo del Proyecto"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Guardar Cambios</button>
            <button onClick={() => setIsEditing(false)} style={{ ...buttonStyle, backgroundColor: 'gray' }}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectSearch;

// Estilos básicos en línea
const containerStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  textAlign: 'center'
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

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer'
};

const detailsStyle = {
  marginTop: '20px',
  textAlign: 'left',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  width: '80%',
  maxWidth: '500px'
};
