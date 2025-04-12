import styles from './PerformanceCategories.module.scss';



// Funzione per determinare la classe CSS in base alla percentuale
const getPercentageClass = (percentage) => {
  if (percentage >= 80) return 'high-score';
  if (percentage >= 50) return 'medium-score';
  return 'low-score';
};

export default function PerformanceCategories({
  objCategories
}) {
  
  return (
    <div className={styles['categories-section']}>
      <h2 className={styles['section-title']}>Performance per categoria</h2>
      <div className={styles['categories-grid']}>
        {objCategories.map(category => {
          const percentage = category.percentage;
          const correct = category.correct;
          const total = category.total;
          const percentageClass = getPercentageClass(percentage);
          
          return (
            <div 
              key={category.cat}
              className={styles['categories-card']}
            >
              <div className={styles['category-header']}>
                <h3 className={styles['category-name']}>{category.labelCategory} - {category.cat}</h3>
                <span className={`${styles['category-badge']} ${percentageClass}`}>/
                {/* <span className={styles.category_badge}> */}
                  {correct}/{total} ({percentage}%)
                </span>
              </div>
              <div className={styles['progress-bar-bg']}>
                <div 
                  className={`${styles['progress-bar']} ${styles[`progress-bar-${percentageClass}`]}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              {percentage < 80 && (
                <p className={styles['category-advice']}>
                  <span className={styles['advice-label']}>Consiglio:</span> Rivedi gli argomenti in questa categoria
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}