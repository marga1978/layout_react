import styles from './Button.module.scss';
const Button = ({ children, onClick, type = "button", className = "" }) => {

  const cssClass= styles[className] ==undefined ? className :  styles[className];
  console.log("className",className)
    return (
      <button 
        type={type} 
        onClick={onClick} 
        className={`${styles[className]}`}        
        //className={`btn ${cssClass}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;