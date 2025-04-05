export function  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Genera un indice casuale tra 0 e i
      [array[i], array[j]] = [array[j], array[i]];  // Scambia gli elementi
    }
    return array;
  }