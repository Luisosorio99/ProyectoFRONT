import React, { useState } from 'react';
import axios from 'axios';

const ProjectSearch = () => {
  const [id, setId] = useState('');
  const [project, setProject] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/proyectos/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error al buscar proyecto', error);
      setProject(null); // Limpiar el proyecto si ocurre un error
    }
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
