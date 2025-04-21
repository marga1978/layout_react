import React from 'react';
import Tree from '../Tree/Tree'; // Assicurati che il path sia corretto

const TreeOrganizations = ({ organigramma }) => {
  const getIdOrganizzativo = (persona) => persona.id;
  const getChildrenOrganizzativo = (persona) => persona.sottoposti;
  const getNodeTypeOrganizzativo = (persona) => persona.sottoposti ? 'rect' : 'circle';
  const getNodeColorOrganizzativo = (persona) => {
    switch (persona.reparto) {
      case 'Direzione': return '#f0f8ff'; // Alice Blue
      case 'Vendite': return '#e0ffff'; // Light Cyan
      case 'Marketing': return '#f5f5dc'; // Beige
      default: return '#fff'; // Bianco
    }
  };
  const getNodeTextOrganizzativo = (persona) => persona.nome;
  const handlePersonaClick = (persona) => {
    console.log("Persona selezionata:", persona);
    // Qui puoi implementare la logica specifica per il click su una persona
  };

  return (
    <Tree
      data={organigramma}
      getId={getIdOrganizzativo}
      getChildren={getChildrenOrganizzativo}
      getNodeType={getNodeTypeOrganizzativo}
      getNodeColor={getNodeColorOrganizzativo}
      getNodeText={getNodeTextOrganizzativo}
      onNodeClick={handlePersonaClick}
      style={{ fontSize: '4px', fontFamily: 'Arial, sans-serif', pointerEvents: 'none' }}
      initialZoom={70} // Puoi personalizzare lo zoom iniziale
    />
  );
};

export default TreeOrganizations;