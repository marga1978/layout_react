export function createTreeStructureQuestions(tree, category, questions) {
  // Prima, creiamo un mapping id->nodo per accesso rapido
  const nodeMap = new Map();
  tree.forEach(item => {
    nodeMap.set(item.id, {
      id: item.id,
      testoBreve: item.label,
      isCorrect: item.isCorrect,
      parentId: item.parentId,
      child: item.child
    });
  });

  // Crea una mappa per le domande per accedervi facilmente
  const questionsMap = {};
  if (questions && Array.isArray(questions)) {
    questions.forEach(question => {
      questionsMap[question.id] = question;
    });
  }

  console.log("questionsMap", questionsMap);

  // Crea una mappa per categoria -> array di domande
  const questionsByCategory = {};
  if (questions && Array.isArray(questions)) {
    questions.forEach(question => {
      if (!questionsByCategory[question.cat]) {
        questionsByCategory[question.cat] = [];
      }
      questionsByCategory[question.cat].push(question.id);
    });
  }

  // Mantieni traccia dell'indice corrente per ogni categoria
  const categoryIndexes = {};

  // Funzione per costruire i nodi dalla categoria
  const buildCategoryNodes = (categoryKey, parentId) => {
    const categoryData = category[categoryKey];
    if (!categoryData) return [];

    const nodes = [];

    // Inizializza l'indice per questa categoria se non esiste
    if (!categoryIndexes[categoryKey]) {
      categoryIndexes[categoryKey] = 0;
    }

    // Genera nodi basati sul limite, usando sempre il formato "domanda" + numero
    for (let i = 1; i <= categoryData.limit; i++) {
      const nodeId = `${parentId}-${i}`;
      const domandaId = extractDomandaId(nodeId);

      // Ottieni l'ID della domanda dalla lista delle domande per questa categoria
      const questionId = questionsByCategory[categoryKey]?.[categoryIndexes[categoryKey]++] || null;

      // Determina se la domanda è corretta prendendo il valore da question.isCorrect
      let isCorrect = null; // Inizializza a null per coerenza con la struttura 'tree' originale
      if (questionId && questionsMap[questionId]) {
        isCorrect = questionsMap[questionId].isCorrect;
      }

      nodes.push({
        id: nodeId,
        testoBreve: `domanda${domandaId}`,
        isCorrect: isCorrect,
        idQuestion: questionId
      });
    }

    return nodes;
  };

  // Funzione per estrarre l'ID domanda (es. "obiettivo1-1" -> "1-1")
  const extractDomandaId = (nodeId) => {
    // Rimuove il prefisso "obiettivo" e altri prefissi se presenti
    return nodeId.replace(/^[a-zA-Z]+/, '');
  };

  // Funzione ricorsiva per costruire l'albero
  const buildTree = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const hierarchicalNode = {
      id: node.id,
      testoBreve: node.testoBreve,
      isCorrect: node.isCorrect,
    };

    const children = tree.filter(item => item.parentId === nodeId);

    if (children.length > 0 || (node.child && node.child.category)) {
      hierarchicalNode.opzioni = [];

      const obiettivoChildren = children.filter(child => child.id.includes('obiettivo'));
      obiettivoChildren.forEach(child => {
        const childNode = buildTree(child.id);
        if (childNode) {
          hierarchicalNode.opzioni.push(childNode);
        }
      });

      if (node.child && node.child.category) {
        const categoryNodes = buildCategoryNodes(node.child.category, node.id);

        if (!node.id.includes('obiettivo') && hierarchicalNode.opzioni.length > 0) {
          hierarchicalNode.opzioni.push(...categoryNodes);
        } else {
          hierarchicalNode.opzioni.splice(0, 0, ...categoryNodes);
        }
      }

      const otherChildren = children.filter(child => !child.id.includes('obiettivo'));
      otherChildren.forEach(child => {
        const childNode = buildTree(child.id);
        if (childNode) {
          hierarchicalNode.opzioni.push(childNode);
        }
      });
    }

    return hierarchicalNode;
  };

  const rootNode = tree.find(item => item.parentId === null);
  if (!rootNode) return null;

  return {
    tree: buildTree(rootNode.id)
  };
}