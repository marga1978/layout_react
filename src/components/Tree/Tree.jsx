import React, { useState, useMemo } from 'react';

const Tree = ({
  data,
  getId,
  getChildren,
  getNodeType,
  getNodeColor,
  getNodeText,
  onNodeClick,
  initialZoom = 100,
  style
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [zoom, setZoom] = useState(initialZoom);

  const { posizioni, viewBoxDimensions } = useMemo(() => {
    const pos = new Map();
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    const calcolaLarghezzaNecessaria = (nodo) => {
      const children = getChildren(nodo) || [];
      if (children.length === 0) {
        return 60;
      }
      let larghezzaTotale = 0;
      children.forEach(child => {
        larghezzaTotale += calcolaLarghezzaNecessaria(child);
      });
      return larghezzaTotale;
    };

    const posizionaNodi = (nodo, x, y, larghezzaDisponibile) => {
      const id = getId(nodo);
      pos.set(id, { x, y, nodo });

      minX = Math.min(minX, x - 30);
      maxX = Math.max(maxX, x + 30);
      minY = Math.min(minY, y - 30);
      maxY = Math.max(maxY, y + 30);

      const children = getChildren(nodo) || [];
      if (children.length > 0) {
        const larghezzaNecessariaTotale = calcolaLarghezzaNecessaria(nodo);
        let posizioneFiglioCorrente = x - larghezzaNecessariaTotale / 2;

        children.forEach(child => {
          const larghezzaNecessariaFiglio = calcolaLarghezzaNecessaria(child);
          const spazioAllocatoFiglio = (larghezzaNecessariaFiglio / larghezzaNecessariaTotale) * larghezzaDisponibile;
          const centroFiglioX = posizioneFiglioCorrente + spazioAllocatoFiglio / 2;
          posizionaNodi(child, centroFiglioX, y + 100, spazioAllocatoFiglio);
          posizioneFiglioCorrente += spazioAllocatoFiglio;
        });
      }
    };

    const rootId = getId(data);
    const larghezzaAlbero = calcolaLarghezzaNecessaria(data);
    const startingX = larghezzaAlbero / 2 + 50;
    const startingY = 50;

    posizionaNodi(data, startingX, startingY, larghezzaAlbero);

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
  }, [data, getId, getChildren]);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 10, 50));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  const renderLinee = (nodo) => {
    const idNodo = getId(nodo);
    const posGenitore = posizioni.get(idNodo);
    const linee = [];
    const children = getChildren(nodo) || [];

    if (children.length > 0 && posGenitore) {
      children.forEach((child) => {
        const idFiglio = getId(child);
        const posFiglio = posizioni.get(idFiglio);
        if (posFiglio) {
          const offsetGenitore = 25;
          const offsetFiglio = getChildren(child)?.length > 0 ? 25 : 20;
          linee.push(
            <path
              key={`linea-${idNodo}-${idFiglio}`}
              d={`M${posGenitore.x} ${posGenitore.y + offsetGenitore} L${posFiglio.x} ${posFiglio.y - offsetFiglio}`}
              stroke="#333"
              strokeWidth="2"
              fill="none"
            />
          );
          linee.push(...renderLinee(child));
        }
      });
    }
    return linee;
  };

  const renderNodi = () => {
    const nodi = [];

    for (const [id, pos] of posizioni) {
      const nodo = pos.nodo;
      const nodeType = getNodeType(nodo);
      const nodeColor = getNodeColor(nodo);
      const nodeText = getNodeText(nodo);
      const hasChildren = getChildren(nodo)?.length > 0;
      const isSelected = selectedNodeId === id;

      if (nodeType === 'circle') {
        nodi.push(
          <circle
            key={`nodo-${id}`}
            cx={pos.x}
            cy={pos.y}
            r="20"
            fill={nodeColor}
            stroke={isSelected ? '#000' : '#333'}
            strokeWidth={isSelected ? '3' : '2'}
            onClick={() => onNodeClick && onNodeClick(nodo)}
            style={{ cursor: 'pointer' }}
          />
        );
      } else if (nodeType === 'rect') {
        nodi.push(
          <rect
            key={`nodo-${id}`}
            x={pos.x - 25}
            y={pos.y - 25}
            width="50"
            height="50"
            fill={nodeColor}
            stroke={isSelected ? '#000' : '#333'}
            strokeWidth={isSelected ? '3' : '2'}
            onClick={() => onNodeClick && onNodeClick(nodo)}
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
          style={style}
        >
          {nodeText}
        </text>
      );
    }
    return nodi;
  };

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
      maxWidth: 'calc(100% - 32px)',
      overflow: 'auto',
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
    <div style={styles.container}>
      <div style={styles.zoomControls}>
        <button onClick={handleZoomOut} style={{ padding: '8px 16px', margin: '0 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: '#2196F3' }} disabled={zoom <= 50}>Zoom -</button>
        <span>{zoom}%</span>
        <button onClick={handleZoomIn} style={{ padding: '8px 16px', margin: '0 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: '#2196F3' }} disabled={zoom >= 200}>Zoom +</button>
        <button onClick={handleZoomReset} style={{ padding: '8px 16px', margin: '0 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white', backgroundColor: '#2196F3' }}>Reset</button>
      </div>

      <div style={styles.svgContainer}>
        <svg
          viewBox={`${viewBoxDimensions.x} ${viewBoxDimensions.y} ${viewBoxDimensions.width} ${viewBoxDimensions.height}`}
          style={{
            width: `${zoom}%`,
            height: 'auto',
            minWidth: '100%'
          }}
        >
          {renderLinee(data)}
          {renderNodi()}
        </svg>
      </div>
    </div>
  );
};

export default Tree;