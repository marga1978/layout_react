import React from 'react';
import Tree from '../../Tree/Tree.jsx'; // Assicurati che il path sia corretto

const TreeQuestions = ({ domande }) => {
  const getIdDomanda = (domanda) => domanda.id;
  const getChildrenDomanda = (domanda) => domanda.opzioni;
  const getNodeTypeDomanda = (domanda) => domanda.opzioni ? 'rect' : 'circle';
  
  // Funzione ricorsiva per trovare tutti i nodi foglia
  const getLeafNodes = (domanda) => {
    if (!domanda.opzioni || domanda.opzioni.length === 0) {
      // È un nodo foglia
      return [domanda];
    }
    
    // Raccoglie i nodi foglia da tutti i figli
    let leafNodes = [];
    domanda.opzioni.forEach(opzione => {
      leafNodes = leafNodes.concat(getLeafNodes(opzione));
    });
    return leafNodes;
  };
  
  // Calcola la percentuale basata sui nodi foglia
  const calculatePercentage = (domanda) => {
    const leafNodes = getLeafNodes(domanda);
    const correctLeaves = leafNodes.filter(leaf => leaf.isCorrect).length;
    const totalLeaves = leafNodes.length;
    
    if (totalLeaves === 0) return 0;
    return (correctLeaves / totalLeaves) * 100;
  };
  
  const getNodeColorDomanda = (domanda) => {
    if (!domanda.opzioni || domanda.opzioni.length === 0) {
      // È un nodo foglia
      return domanda.isCorrect ? '#98FB98' : '#FFB6C1';
    }
    
    // È un nodo intermedio - calcola basandosi sui nodi foglia
    const percentuale = calculatePercentage(domanda);
    return percentuale >= 70 ? '#98FB98' : '#FFB6C1';
  };
  
  const getNodeTextDomanda = (domanda) => {
    if (!domanda.opzioni || domanda.opzioni.length === 0) {
      // È un nodo foglia
      return domanda.isCorrect ? '100%' : '0%';
    }
    
    // È un nodo intermedio - calcola basandosi sui nodi foglia
    const percentuale = calculatePercentage(domanda);
    return `${percentuale.toFixed(0)}%`;
  };
  
  const handleDomandaClick = (domanda) => {
    console.log("Domanda cliccata:", domanda);
  };

  return (
    <Tree
      data={domande}
      getId={getIdDomanda}
      getChildren={getChildrenDomanda}
      getNodeType={getNodeTypeDomanda}
      getNodeColor={getNodeColorDomanda}
      getNodeText={getNodeTextDomanda}
      onNodeClick={handleDomandaClick}
      style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', pointerEvents: 'none' }}
      initialZoom={80}
    />
  );
};

export default TreeQuestions;