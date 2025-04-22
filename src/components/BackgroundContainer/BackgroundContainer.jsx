import styles from './BackgroundContainer.module.scss';


/*
example

// Variante di default
<BackgroundContainer>
  Contenuto standard
</BackgroundContainer>

// Variante small
<BackgroundContainer variant="small">
  Contenuto piccolo
</BackgroundContainer>

// Variante centrata
<BackgroundContainer variant="centered">
  Contenuto centrato
</BackgroundContainer>

// Con classe CSS aggiuntiva
<BackgroundContainer variant="large" className="mia-classe-custom">
  Contenuto largo con stile aggiuntivo
</BackgroundContainer>

*/

const BackgroundContainer = ({ 
    children, 
    variant = 'default',
    className = ''
  }) => {

    // Costruisci la classe in base alla variante
    const containerClass = `${styles["bg-element"]} ${styles[`bg-element--${variant}`]} ${className}`;

    return (
      <div className={containerClass} >
        {children}
      </div>
    );
  };
  
  export default BackgroundContainer;