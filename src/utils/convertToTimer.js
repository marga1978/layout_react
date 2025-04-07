export function convertToTimer(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
  
    // Aggiungi zeri davanti se necessario
    let hStr = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
    let mStr = String(minutes).padStart(2, '0');
    let sStr = String(seconds).padStart(2, '0');
  
    return hStr + mStr + ':' + sStr;
  }