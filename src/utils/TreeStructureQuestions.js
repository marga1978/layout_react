export function createTreeStructureQuestions(tree, category) {
  // Prima, creiamo un mapping id->nodo per accesso rapido
  const nodeMap = new Map();
  tree.forEach(item => {
    nodeMap.set(item.id, {
      id: item.id,
      testoBreve: item.label,
      isCorretta: item.isCorrect,
      parentId: item.parentId,
      child: item.child
    });
  });

  // Funzione per costruire i nodi dalla categoria
  const buildCategoryNodes = (categoryKey, parentId) => {
    const categoryData = category[categoryKey];
    if (!categoryData) return [];
    
    const nodes = [];
    
    if (categoryData.treeLabel) {
      // Trasforma i treeLabel in nodi domanda
      for (let i = 0; i < categoryData.treeLabel.length; i++) {
        nodes.push({
          id: `${parentId}-${i + 1}`,
          testoBreve: "",
          isCorretta: false
        });
      }
    } else {
      // Genera nodi basati sul limite
      for (let i = 1; i <= categoryData.limit; i++) {
        nodes.push({
          id: `${parentId}-${i}`,
          testoBreve: parentId === 'root' ? 'Obiettivo generale' : '',
          isCorretta: false
        });
      }
    }
    
    return nodes;
  };

  // Funzione ricorsiva per costruire l'albero
  const buildTree = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const hierarchicalNode = {
      id: node.id,
      testoBreve: node.testoBreve,
      isCorretta: node.isCorretta
    };

    // Filtra gli elementi che hanno questo nodo come parent
    const children = tree.filter(item => item.parentId === nodeId);
    
    if (children.length > 0) {
      hierarchicalNode.opzioni = [];
      
      // Costruisci ricorsivamente i figli
      children.forEach(child => {
        const childNode = buildTree(child.id);
        if (childNode) {
          hierarchicalNode.opzioni.push(childNode);
        }
      });
      
      // Se il nodo ha una categoria associata, aggiungi i nodi foglia
      if (node.child && node.child.category) {
        const categoryNodes = buildCategoryNodes(node.child.category, node.id);
        
        // Inserisci i nodi categoria nelle posizioni appropriate
        if (hierarchicalNode.opzioni.length === 0) {
          hierarchicalNode.opzioni = categoryNodes;
        } else {
          // Per obiettivo1, inserisci le domande prima di obiettivo1-3
          if (nodeId === 'obiettivo1') {
            // Trova l'indice di obiettivo1-3 nell'array opzioni
            const indexOfObiettivo1_3 = hierarchicalNode.opzioni.findIndex(n => n.id === 'obiettivo1-3');
            if (indexOfObiettivo1_3 !== -1) {
              // Inserisci i nodi prima di obiettivo1-3
              hierarchicalNode.opzioni.splice(indexOfObiettivo1_3, 0, ...categoryNodes);
            } else {
              hierarchicalNode.opzioni.push(...categoryNodes);
            }
          } else {
            hierarchicalNode.opzioni.push(...categoryNodes);
          }
        }
      }
    } else if (node.child && node.child.category) {
      // Se non ci sono figli ma c'è una categoria, aggiungi i nodi foglia
      hierarchicalNode.opzioni = buildCategoryNodes(node.child.category, node.id);
    }

    return hierarchicalNode;
  };

  // Trova il nodo root e costruisci l'albero a partire da esso
  const rootNode = tree.find(item => item.parentId === null);
  if (!rootNode) return null;

  return {
    tree: buildTree(rootNode.id)
  };
}