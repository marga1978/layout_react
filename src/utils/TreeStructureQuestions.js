// export function createTreeStructureQuestions(tree, category) {
//   // Prima, creiamo un mapping id->nodo per accesso rapido
//   const nodeMap = new Map();
//   tree.forEach(item => {
//     nodeMap.set(item.id, {
//       id: item.id,
//       testoBreve: item.label,
//       isCorretta: item.isCorrect,
//       parentId: item.parentId,
//       child: item.child
//     });
//   });

//   // Funzione per costruire i nodi dalla categoria
//   const buildCategoryNodes = (categoryKey, parentId) => {
//     const categoryData = category[categoryKey];
//     if (!categoryData) return [];
    
//     const nodes = [];
    
//     if (categoryData.treeLabel) {
//       // Trasforma i treeLabel in nodi domanda
//       for (let i = 0; i < categoryData.treeLabel.length; i++) {
//         nodes.push({
//           id: `${parentId}-${i + 1}`,
//           testoBreve: "",
//           isCorretta: false
//         });
//       }
//     } else {
//       // Genera nodi basati sul limite
//       for (let i = 1; i <= categoryData.limit; i++) {
//         nodes.push({
//           id: `${parentId}-${i}`,
//           testoBreve: parentId === 'root' ? 'Obiettivo generale' : '',
//           isCorretta: false
//         });
//       }
//     }
    
//     return nodes;
//   };

//   // Funzione ricorsiva per costruire l'albero
//   const buildTree = (nodeId) => {
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;

//     const hierarchicalNode = {
//       id: node.id,
//       testoBreve: node.testoBreve,
//       isCorretta: node.isCorretta
//     };

//     // Filtra gli elementi che hanno questo nodo come parent
//     const children = tree.filter(item => item.parentId === nodeId);
    
//     if (children.length > 0) {
//       hierarchicalNode.opzioni = [];
      
//       // Costruisci ricorsivamente i figli
//       children.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
      
//       // Se il nodo ha una categoria associata, aggiungi i nodi foglia
//       if (node.child && node.child.category) {
//         const categoryNodes = buildCategoryNodes(node.child.category, node.id);
        
//         // Inserisci i nodi categoria nelle posizioni appropriate
//         if (hierarchicalNode.opzioni.length === 0) {
//           hierarchicalNode.opzioni = categoryNodes;
//         } else {
//           // Per obiettivo1, inserisci le domande prima di obiettivo1-3
//           if (nodeId === 'obiettivo1') {
//             // Trova l'indice di obiettivo1-3 nell'array opzioni
//             const indexOfObiettivo1_3 = hierarchicalNode.opzioni.findIndex(n => n.id === 'obiettivo1-3');
//             if (indexOfObiettivo1_3 !== -1) {
//               // Inserisci i nodi prima di obiettivo1-3
//               hierarchicalNode.opzioni.splice(indexOfObiettivo1_3, 0, ...categoryNodes);
//             } else {
//               hierarchicalNode.opzioni.push(...categoryNodes);
//             }
//           } else {
//             hierarchicalNode.opzioni.push(...categoryNodes);
//           }
//         }
//       }
//     } else if (node.child && node.child.category) {
//       // Se non ci sono figli ma c'è una categoria, aggiungi i nodi foglia
//       hierarchicalNode.opzioni = buildCategoryNodes(node.child.category, node.id);
//     }

//     return hierarchicalNode;
//   };

//   // Trova il nodo root e costruisci l'albero a partire da esso
//   const rootNode = tree.find(item => item.parentId === null);
//   if (!rootNode) return null;

//   return {
//     tree: buildTree(rootNode.id)
//   };
// }


// export function createTreeStructureQuestions(tree, category) {
//   // Prima, creiamo un mapping id->nodo per accesso rapido
//   const nodeMap = new Map();
//   tree.forEach(item => {
//     nodeMap.set(item.id, {
//       id: item.id,
//       testoBreve: item.label,
//       isCorretta: item.isCorrect,
//       parentId: item.parentId,
//       child: item.child
//     });
//   });

//   // Funzione per costruire i nodi dalla categoria
//   const buildCategoryNodes = (categoryKey, parentId) => {
//     const categoryData = category[categoryKey];
//     if (!categoryData) return [];
    
//     const nodes = [];
    
//     // Genera nodi basati sul limite, usando sempre il formato "domanda" + numero
//     for (let i = 1; i <= categoryData.limit; i++) {
//       const nodeId = `${parentId}-${i}`;
//       const domandaId = extractDomandaId(nodeId);
      
//       nodes.push({
//         id: nodeId,
//         testoBreve: `domanda${domandaId}`,
//         isCorretta: false
//       });
//     }
    
//     return nodes;
//   };

//   // Funzione per estrarre l'ID domanda (es. "obiettivo1-1" -> "1-1")
//   const extractDomandaId = (nodeId) => {
//     // Rimuove il prefisso "obiettivo" e altri prefissi se presenti
//     return nodeId.replace(/^[a-zA-Z]+/, '');
//   };

//   // Funzione ricorsiva per costruire l'albero
//   const buildTree = (nodeId) => {
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;

//     const hierarchicalNode = {
//       id: node.id,
//       testoBreve: node.testoBreve,
//       isCorretta: node.isCorretta
//     };

//     // Filtra gli elementi che hanno questo nodo come parent
//     const children = tree.filter(item => item.parentId === nodeId);
    
//     if (children.length > 0) {
//       hierarchicalNode.opzioni = [];
      
//       // Costruisci ricorsivamente i figli
//       children.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
      
//       // Se il nodo ha una categoria associata, aggiungi i nodi foglia
//       if (node.child && node.child.category) {
//         const categoryNodes = buildCategoryNodes(node.child.category, node.id);
        
//         // Inserisci i nodi categoria nelle posizioni appropriate
//         if (hierarchicalNode.opzioni.length === 0) {
//           hierarchicalNode.opzioni = categoryNodes;
//         } else {
//           // Per obiettivo1, inserisci le domande prima di obiettivo1-3
//           if (nodeId === 'obiettivo1') {
//             // Trova l'indice di obiettivo1-3 nell'array opzioni
//             const indexOfObiettivo1_3 = hierarchicalNode.opzioni.findIndex(n => n.id === 'obiettivo1-3');
//             if (indexOfObiettivo1_3 !== -1) {
//               // Inserisci i nodi prima di obiettivo1-3
//               hierarchicalNode.opzioni.splice(indexOfObiettivo1_3, 0, ...categoryNodes);
//             } else {
//               hierarchicalNode.opzioni.push(...categoryNodes);
//             }
//           } else {
//             hierarchicalNode.opzioni.push(...categoryNodes);
//           }
//         }
//       }
//     } else if (node.child && node.child.category) {
//       // Se non ci sono figli ma c'è una categoria, aggiungi i nodi foglia
//       hierarchicalNode.opzioni = buildCategoryNodes(node.child.category, node.id);
//     }

//     return hierarchicalNode;
//   };

//   // Trova il nodo root e costruisci l'albero a partire da esso
//   const rootNode = tree.find(item => item.parentId === null);
//   if (!rootNode) return null;

//   return {
//     tree: buildTree(rootNode.id)
//   };
// }

// export function createTreeStructureQuestions(tree, category, questions) {
//   // Prima, creiamo un mapping id->nodo per accesso rapido
//   const nodeMap = new Map();
//   tree.forEach(item => {
//     nodeMap.set(item.id, {
//       id: item.id,
//       testoBreve: item.label,
//       isCorretta: item.isCorrect,
//       parentId: item.parentId,
//       child: item.child
//     });
//   });

//   console.log("questions ciclo",questions)
//   // Crea una mappa per categoria -> array di domande
//   const questionsByCategory = questions.reduce((acc, question) => {
//     if (!acc[question.cat]) {
//       acc[question.cat] = [];
//     }
//     acc[question.cat].push(question.id);
//     return acc;
//   }, {});

//   // Mantieni traccia dell'indice corrente per ogni categoria
//   const categoryIndexes = {};

//   // Funzione per costruire i nodi dalla categoria
//   const buildCategoryNodes = (categoryKey, parentId) => {
//     const categoryData = category[categoryKey];
//     if (!categoryData) return [];
    
//     const nodes = [];
    
//     // Inizializza l'indice per questa categoria se non esiste
//     if (!categoryIndexes[categoryKey]) {
//       categoryIndexes[categoryKey] = 0;
//     }
    
//     // Genera nodi basati sul limite, usando sempre il formato "domanda" + numero
//     for (let i = 1; i <= categoryData.limit; i++) {
//       const nodeId = `${parentId}-${i}`;
//       const domandaId = extractDomandaId(nodeId);
      
//       // Ottieni l'ID della domanda dalla lista delle domande per questa categoria
//       const questionId = questionsByCategory[categoryKey]?.[categoryIndexes[categoryKey]++] || null;
      
//       nodes.push({
//         id: nodeId,
//         testoBreve: `domanda${domandaId}`,
//         isCorretta: false,
//         idQuestion: questionId
//       });
//     }
    
//     return nodes;
//   };

//   // Funzione per estrarre l'ID domanda (es. "obiettivo1-1" -> "1-1")
//   const extractDomandaId = (nodeId) => {
//     // Rimuove il prefisso "obiettivo" e altri prefissi se presenti
//     return nodeId.replace(/^[a-zA-Z]+/, '');
//   };

//   // Funzione ricorsiva per costruire l'albero
//   const buildTree = (nodeId) => {
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;

//     const hierarchicalNode = {
//       id: node.id,
//       testoBreve: node.testoBreve,
//       isCorretta: node.isCorretta
//     };

//     // Filtra gli elementi che hanno questo nodo come parent
//     const children = tree.filter(item => item.parentId === nodeId);
    
//     if (children.length > 0) {
//       hierarchicalNode.opzioni = [];
      
//       // Se il nodo ha una categoria associata, aggiungi prima i nodi foglia
//       if (node.child && node.child.category) {
//         const categoryNodes = buildCategoryNodes(node.child.category, node.id);
//         hierarchicalNode.opzioni = [...categoryNodes];
//       }
      
//       // Poi costruisci ricorsivamente i figli e aggiungili
//       children.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
      
//     } else if (node.child && node.child.category) {
//       // Se non ci sono figli ma c'è una categoria, aggiungi i nodi foglia
//       hierarchicalNode.opzioni = buildCategoryNodes(node.child.category, node.id);
//     }

//     return hierarchicalNode;
//   };

//   // Trova il nodo root e costruisci l'albero a partire da esso
//   const rootNode = tree.find(item => item.parentId === null);
//   if (!rootNode) return null;

//   return {
//     tree: buildTree(rootNode.id)
//   };
// }

// export function createTreeStructureQuestions(tree, category, questions) {
//   // Prima, creiamo un mapping id->nodo per accesso rapido
//   const nodeMap = new Map();
//   tree.forEach(item => {
//     nodeMap.set(item.id, {
//       id: item.id,
//       testoBreve: item.label,
//       isCorrect: item.isCorrect,
//       parentId: item.parentId,
//       child: item.child
//     });
//   });

//   // Crea una mappa per categoria -> array di domande
//   const questionsByCategory = questions.reduce((acc, question) => {
//     if (!acc[question.cat]) {
//       acc[question.cat] = [];
//     }
//     acc[question.cat].push(question.id);
//     return acc;
//   }, {});

//   // Mantieni traccia dell'indice corrente per ogni categoria
//   const categoryIndexes = {};

//   // Funzione per costruire i nodi dalla categoria
//   const buildCategoryNodes = (categoryKey, parentId) => {
//     const categoryData = category[categoryKey];
//     if (!categoryData) return [];
    
//     const nodes = [];
    
//     // Inizializza l'indice per questa categoria se non esiste
//     if (!categoryIndexes[categoryKey]) {
//       categoryIndexes[categoryKey] = 0;
//     }
    
//     // Genera nodi basati sul limite, usando sempre il formato "domanda" + numero
//     for (let i = 1; i <= categoryData.limit; i++) {
//       const nodeId = `${parentId}-${i}`;
//       const domandaId = extractDomandaId(nodeId);
      
//       // Ottieni l'ID della domanda dalla lista delle domande per questa categoria
//       const questionId = questionsByCategory[categoryKey]?.[categoryIndexes[categoryKey]++] || null;
      
//       nodes.push({
//         id: nodeId,
//         testoBreve: `domanda${domandaId}`,
//         isCorrect: false,
//         idQuestion: questionId
//       });
//     }
    
//     return nodes;
//   };

//   // Funzione per estrarre l'ID domanda (es. "obiettivo1-1" -> "1-1")
//   const extractDomandaId = (nodeId) => {
//     // Rimuove il prefisso "obiettivo" e altri prefissi se presenti
//     return nodeId.replace(/^[a-zA-Z]+/, '');
//   };

//   // Funzione ricorsiva per costruire l'albero
//   const buildTree = (nodeId) => {
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;

//     const hierarchicalNode = {
//       id: node.id,
//       testoBreve: node.testoBreve,
//       isCorrect: node.isCorrect
//     };

//     // Filtra gli elementi che hanno questo nodo come parent
//     const children = tree.filter(item => item.parentId === nodeId);
    
//     if (children.length > 0 || (node.child && node.child.category)) {
//       hierarchicalNode.opzioni = [];
      
//       // Prima costruisci i figli con "obiettivo" nel nome
//       const obiettivoChildren = children.filter(child => child.id.includes('obiettivo'));
//       obiettivoChildren.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
      
//       // Poi costruisci i nodi categoria se presenti
//       if (node.child && node.child.category) {
//         const categoryNodes = buildCategoryNodes(node.child.category, node.id);
        
//         // Se il nodo corrente non contiene "obiettivo" e ci sono già nodi obiettivo presenti,
//         // aggiungi i nodi categoria alla fine
//         if (!node.id.includes('obiettivo') && hierarchicalNode.opzioni.length > 0) {
//           hierarchicalNode.opzioni.push(...categoryNodes);
//         } else {
//           // Altrimenti, aggiungi i nodi categoria all'inizio
//           hierarchicalNode.opzioni.splice(0, 0, ...categoryNodes);
//         }
//       }
      
//       // Infine costruisci gli altri figli senza "obiettivo"
//       const otherChildren = children.filter(child => !child.id.includes('obiettivo'));
//       otherChildren.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
//     }

//     return hierarchicalNode;
//   };

//   // Trova il nodo root e costruisci l'albero a partire da esso
//   const rootNode = tree.find(item => item.parentId === null);
//   if (!rootNode) return null;

//   return {
//     tree: buildTree(rootNode.id)
//   };
// }



// export function createTreeStructureQuestions(tree, category, questions) {
//   // Prima, creiamo un mapping id->nodo per accesso rapido
//   const nodeMap = new Map();
//   tree.forEach(item => {
//     nodeMap.set(item.id, {
//       id: item.id,
//       testoBreve: item.label,
//       isCorrect: item.isCorrect,
//       parentId: item.parentId,
//       child: item.child
//     });
//   });

//   // Crea una mappa per le domande per accedervi facilmente
//   const questionsMap = {};
//   if (questions && Array.isArray(questions)) {
//     questions.forEach(question => {
//       questionsMap[question.id] = question;
//     });
//   }

//   console.log("questionsMap",questionsMap)

//   // Crea una mappa per categoria -> array di domande
//   const questionsByCategory = {};
//   if (questions && Array.isArray(questions)) {
//     questions.forEach(question => {
//       if (!questionsByCategory[question.cat]) {
//         questionsByCategory[question.cat] = [];
//       }
//       questionsByCategory[question.cat].push(question.id);
//     });
//   }

//   // Mantieni traccia dell'indice corrente per ogni categoria
//   const categoryIndexes = {};

//   // Funzione per costruire i nodi dalla categoria
//   const buildCategoryNodes = (categoryKey, parentId) => {
//     const categoryData = category[categoryKey];
//     if (!categoryData) return [];
    
//     const nodes = [];
    
//     // Inizializza l'indice per questa categoria se non esiste
//     if (!categoryIndexes[categoryKey]) {
//       categoryIndexes[categoryKey] = 0;
//     }
    
//     // Genera nodi basati sul limite, usando sempre il formato "domanda" + numero
//     for (let i = 1; i <= categoryData.limit; i++) {
//       const nodeId = `${parentId}-${i}`;
//       const domandaId = extractDomandaId(nodeId);
      
//       // Ottieni l'ID della domanda dalla lista delle domande per questa categoria
//       const questionId = questionsByCategory[categoryKey]?.[categoryIndexes[categoryKey]++] || null;
      
//       // Determina se la domanda è corretta
//       let isCorrect = false;
//       if (questionId && questionsMap[questionId]) {
//         // Se è "multiple", controlla se tutte le risposte sono corrette
//         if (questionsMap[questionId].type === "multiple") {
//           isCorrect = questionsMap[questionId].answers.every(answer => answer.correct);
//         } else {
//           // Altrimenti, controlla se almeno una risposta è corretta
//           isCorrect = questionsMap[questionId].answers.some(answer => answer.correct);
//         }
//       }
      
//       nodes.push({
//         id: nodeId,
//         testoBreve: `domanda${domandaId}`,
//         isCorrect: isCorrect,
//         idQuestion: questionId
//       });
//     }
    
//     return nodes;
//   };

//   // Funzione per estrarre l'ID domanda (es. "obiettivo1-1" -> "1-1")
//   const extractDomandaId = (nodeId) => {
//     // Rimuove il prefisso "obiettivo" e altri prefissi se presenti
//     return nodeId.replace(/^[a-zA-Z]+/, '');
//   };

//   // Funzione ricorsiva per costruire l'albero
//   const buildTree = (nodeId) => {
//     const node = nodeMap.get(nodeId);
//     if (!node) return null;

//     const hierarchicalNode = {
//       id: node.id,
//       testoBreve: node.testoBreve,
//       isCorrect: node.isCorrect
//     };

//     // Filtra gli elementi che hanno questo nodo come parent
//     const children = tree.filter(item => item.parentId === nodeId);
    
//     if (children.length > 0 || (node.child && node.child.category)) {
//       hierarchicalNode.opzioni = [];
      
//       // Prima costruisci i figli con "obiettivo" nel nome
//       const obiettivoChildren = children.filter(child => child.id.includes('obiettivo'));
//       obiettivoChildren.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
      
//       // Poi costruisci i nodi categoria se presenti
//       if (node.child && node.child.category) {
//         const categoryNodes = buildCategoryNodes(node.child.category, node.id);
        
//         // Se il nodo corrente NON contiene "obiettivo" e ci sono già nodi obiettivo presenti,
//         // aggiungi i nodi categoria alla fine
//         if (!node.id.includes('obiettivo') && hierarchicalNode.opzioni.length > 0) {
//           hierarchicalNode.opzioni.push(...categoryNodes);
//         } else {
//           // Altrimenti, aggiungi i nodi categoria all'inizio
//           hierarchicalNode.opzioni.splice(0, 0, ...categoryNodes);
//         }
//       }
      
//       // Infine costruisci gli altri figli senza "obiettivo"
//       const otherChildren = children.filter(child => !child.id.includes('obiettivo'));
//       otherChildren.forEach(child => {
//         const childNode = buildTree(child.id);
//         if (childNode) {
//           hierarchicalNode.opzioni.push(childNode);
//         }
//       });
//     }

//     return hierarchicalNode;
//   };

//   // Trova il nodo root e costruisci l'albero a partire da esso
//   const rootNode = tree.find(item => item.parentId === null);
//   if (!rootNode) return null;

//   return {
//     tree: buildTree(rootNode.id)
//   };
// }


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