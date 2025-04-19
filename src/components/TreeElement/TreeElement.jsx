import stylesImported from './TreeElement.module.scss';
import React, { useState, useMemo } from 'react';

const AlberoGenealogico = () => {
  // Struttura dati iniziale con i dati dell'albero genealogico
  const datiIniziali = {
    id: "padre",
    nome: "",
    livello: 0,
    corretto: null,
    figli: [
      {
        id: "figlio1",
        nome: "",
        livello: 1,
        corretto: null,
        figli: [
          { id: "nipote1-1", nome: "", livello: 2, corretto: true, figli: [] },
          { id: "nipote1-2", nome: "", livello: 2, corretto: true, figli: [] },
          { id: "nipote1-3", nome: "", livello: 2, corretto: false, figli: [] }
        ]
      },
      {
        id: "figlio2",
        nome: "",
        livello: 1,
        corretto: null,
        figli: [
          { id: "nipote2-1", nome: "", livello: 2, corretto: true, figli: [] },
          { id: "nipote2-2", nome: "", livello: 2, corretto: false, figli: [
            {id: "nipote2-2-1", nome: "", livello: 3, corretto: true, figli: []},
            {id: "nipote2-2-2", nome: "", livello: 3, corretto: true, figli: []},
            {id: "nipote2-2-3", nome: "", livello: 3, corretto: true, figli: []}
          ] }
        ]
      },
      {
        id: "figlio3",
        nome: "",
        livello: 1,
        corretto: true,
        figli: []
      },
      {
        id: "figlio4",
        nome: "",
        livello: 1,
        corretto: null,
        figli: [
          { id: "nipote4-1", nome: "", livello: 2, corretto: true, figli: [] }
        ]
      }
    ]
  };

  const [dati, setDati] = useState(datiIniziali);
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(100);

  // Funzione per calcolare la correttezza dei nodi
  const calcolaCorrettezza = (nodo) => {
    if (!nodo.figli || nodo.figli.length === 0) {
      return nodo.corretto;
    }

    let figliCorretti = 0;
    nodo.figli.forEach(figlio => {
      if (calcolaCorrettezza(figlio)) {
        figliCorretti++;
      }
    });

    const percentualeCorretti = (figliCorretti / nodo.figli.length) * 100;
    return percentualeCorretti >= 70;
  };

  const { posizioni, viewBoxDimensions } = useMemo(() => {
    const pos = new Map();
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    const calcolaLarghezzaNecessaria = (nodo) => {
      if (!nodo.figli || nodo.figli.length === 0) {
        return 60; // Larghezza minima per un nodo foglia
      }
      let larghezzaTotale = 0;
      nodo.figli.forEach(figlio => {
        larghezzaTotale += calcolaLarghezzaNecessaria(figlio);
      });
      return larghezzaTotale;
    };

    const posizionaNodi = (nodo, x, y, larghezzaDisponibile) => {
      pos.set(nodo.id, { x, y, nodo });

      minX = Math.min(minX, x - 30);
      maxX = Math.max(maxX, x + 30);
      minY = Math.min(minY, y - 30);
      maxY = Math.max(maxY, y + 30);

      if (nodo.figli && nodo.figli.length > 0) {
        const larghezzaNecessariaTotale = calcolaLarghezzaNecessaria(nodo);
        let posizioneFiglioCorrente = x - larghezzaNecessariaTotale / 2;

        nodo.figli.forEach(figlio => {
          const larghezzaNecessariaFiglio = calcolaLarghezzaNecessaria(figlio);
          const spazioAllocatoFiglio = (larghezzaNecessariaFiglio / larghezzaNecessariaTotale) * larghezzaDisponibile;
          const centroFiglioX = posizioneFiglioCorrente + spazioAllocatoFiglio / 2;
          posizionaNodi(figlio, centroFiglioX, y + 100, spazioAllocatoFiglio);
          posizioneFiglioCorrente += spazioAllocatoFiglio;
        });
      }
    };

    const larghezzaAlbero = calcolaLarghezzaNecessaria(dati);
    const startingX = larghezzaAlbero / 2 + 50;
    const startingY = 50;

    posizionaNodi(dati, startingX, startingY, larghezzaAlbero);

    const padding = 20;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    return {
      posizioni: pos,
      viewBoxDimensions: {
        x: minX - padding,
        y: minY - padding,
        width: width,
        height: height
      }
    };
  }, [dati]);

  // Aggiorna lo stato di un nodo
  const aggiornaStatoNodo = (idNodo, nuovoStato) => {
    const copiaAlbero = JSON.parse(JSON.stringify(dati));

    const trovaEAggiorna = (nodo) => {
      if (nodo.id === idNodo) {
        nodo.corretto = nuovoStato;
        return true;
      }

      if (nodo.figli) {
        for (const figlio of nodo.figli) {
          if (trovaEAggiorna(figlio)) {
            return true;
          }
        }
      }

      return false;
    };

    trovaEAggiorna(copiaAlbero);
    setDati(copiaAlbero);
  };

  // Funzioni per gestire lo zoom
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 10, 50));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  // Rendering delle linee
  const renderLinee = (nodo) => {
    const posGenitore = posizioni.get(nodo.id);
    const linee = [];

    if (nodo.figli && nodo.figli.length > 0) {
      nodo.figli.forEach((figlio, index) => {
        const posFiglio = posizioni.get(figlio.id);
        const offsetGenitore = 25;
        const offsetFiglio = figlio.figli.length > 0 ? 25 : 20;

        linee.push(
          <path
            key={`linea-${nodo.id}-${figlio.id}`}
            d={`M${posGenitore.x} ${posGenitore.y + offsetGenitore} L${posFiglio.x} ${posFiglio.y - offsetFiglio}`}
            stroke="#333"
            strokeWidth="2"
            fill="none"
          />
        );

        linee.push(...renderLinee(figlio));
      });
    }

    return linee;
  };

  // Rendering dei nodi
  const renderNodi = () => {
    const nodi = [];

    const calcolaPercentualeCorrettaDiscendenti = (nodo) => {
      if (!nodo.figli || nodo.figli.length === 0) {
        return nodo.corretto ? 1 : 0;
      }

      let totale = 0;
      let corretti = 0;

      const visitaNodi = (n) => {
        if (!n.figli || n.figli.length === 0) {
          totale++;
          if (n.corretto) {
            corretti++;
          }
        } else {
          n.figli.forEach(visitaNodi);
        }
      };

      nodo.figli.forEach(visitaNodi);

      return totale > 0 ? (corretti / totale) * 100 : 0;
    };

    for (const [id, pos] of posizioni) {
      const nodo = pos.nodo;
      let colore = '#FFB6C1';
      let testoInterno = '';

      if (!nodo.figli || nodo.figli.length === 0) {
        colore = nodo.corretto ? '#98FB98' : '#FFB6C1';
        testoInterno = nodo.corretto ? '100%' : '0%';
        nodi.push(
          <circle
            key={`nodo-${id}`}
            cx={pos.x}
            cy={pos.y}
            r="20"
            fill={colore}
            stroke={selectedNode === id ? '#000' : '#333'}
            strokeWidth={selectedNode === id ? '3' : '2'}
            onClick={() => setSelectedNode(id)}
            style={{ cursor: 'pointer' }}
          />
        );
      } else {
        const percentualeCorretta = calcolaPercentualeCorrettaDiscendenti(nodo);
        colore = percentualeCorretta >= 70 ? '#98FB98' : '#FFB6C1';
        testoInterno = percentualeCorretta.toFixed(0) + '%';
        nodi.push(
          <rect
            key={`nodo-${id}`}
            x={pos.x - 25}
            y={pos.y - 25}
            width="50"
            height="50"
            fill={colore}
            stroke={selectedNode === id ? '#000' : '#333'}
            strokeWidth={selectedNode === id ? '3' : '2'}
            onClick={() => setSelectedNode(id)}
            style={{ cursor: 'pointer' }}
          />
        );
      }

      nodi.push(
        <text
          key={`testo-${id}`}
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: '12px', fontFamily: 'Arial, sans-serif', pointerEvents: 'none' }}
        >
          {testoInterno}
        </text>
      );
    }

    return nodi;
  };

  // Stili CSS-in-JS
  const styles = {

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    svgContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '16px',
      width: '100%',
      // maxWidth: 'calc(100% - 32px)',
      overflow: 'auto',
      //maxHeight: '70vh'
    },
    controlPanel: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '16px'
    },
    button: {
      padding: '8px 16px',
      margin: '0 8px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      color: 'white'
    },
    correctButton: {
      backgroundColor: '#4CAF50'
    },
    errorButton: {
      backgroundColor: '#f44336'
    },
    zoomButton: {
      backgroundColor: '#2196F3'
    },
    legend: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '16px',
      fontSize: '14px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '4px'
    },
    zoomControls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '12px'
    }
  };

  return (
    <div className={stylesImported.bgElement}>
      <div style={styles.container}>
        {/* <div style={styles.zoomControls}>
          <button
            onClick={handleZoomOut}
            style={{...styles.button, ...styles.zoomButton}}
            disabled={zoom <= 50}
          >
            Zoom -
          </button>
          <span>{zoom}%</span>
          <button
            onClick={handleZoomIn}
            style={{...styles.button, ...styles.zoomButton}}
            disabled={zoom >= 200}
          >
            Zoom +
          </button>
          <button
            onClick={handleZoomReset}
            style={{...styles.button, ...styles.zoomButton}}
          >
            Reset
          </button>
        </div> */}

        <div style={styles.svgContainer}>
          <svg
            viewBox={`${viewBoxDimensions.x} ${viewBoxDimensions.y} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
            style={{
              width: `${zoom}%`,
              height: 'auto',
              minWidth: '100%'
            }}
          >
            {renderLinee(dati)}
            {renderNodi()}
          </svg>
        </div>

        {selectedNode && posizioni.get(selectedNode) && (!posizioni.get(selectedNode).nodo.figli || posizioni.get(selectedNode).nodo.figli.length === 0) && (
          <div style={styles.controlPanel}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
              Nodo selezionato: {posizioni.get(selectedNode).nodo.nome}
            </h3>
            <div>
              <button
                onClick={() => aggiornaStatoNodo(selectedNode, true)}
                style={{...styles.button, ...styles.correctButton}}
              >
                Imposta Corretto
              </button>
              <button
                onClick={() => aggiornaStatoNodo(selectedNode, false)}
                style={{...styles.button, ...styles.errorButton}}
              >
                Imposta Errato
              </button>
            </div>
          </div>
        )}

        <div style={styles.legend}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legenda:</h3>
          <div style={styles.legendItem}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#98FB98', border: '1px solid #333' }} />
            <span>Nodo corretto (foglia: 100%) / ≥70% discendenti corretti (padre)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#FFB6C1', border: '1px solid #333' }} />
            <span>Nodo errato (foglia: 0%) / &lt;70% discendenti corretti (padre)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ width: '16px', height: '16px', border: '2px solid #333' }} />
            <span>Nodo con figli</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #333' }} />
            <span>Nodo foglia (senza figli)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlberoGenealogico;