export function formatNumericInput(value, allowDecimal = false) {
  if (allowDecimal) {
    // Remover caracteres não numéricos nem pontos
    let numericValue = value.replace(/[^0-9.]/g, '');

    // Verificar se o ponto é o primeiro caractere
    if (numericValue.startsWith('.')) {
      numericValue = '0' + numericValue;
    }

    // Verificar se há mais de um ponto decimal e, se houver, manter apenas o primeiro
    const decimalCount = (numericValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      const parts = numericValue.split('.');
      numericValue = parts[0] + '.' + parts[1];
    }

    return numericValue;
  } else {
    // Se allowDecimal for falso, remover caracteres não numéricos
    let numericValue = value.replace(/[^0-9]/g, '');

    // Verificar se há um 0 no início seguido por outro número e, se houver, remover o 0
    if (numericValue.length > 1 && numericValue[0] === '0') {
      numericValue = numericValue.slice(1);
    }

    return numericValue;
  }
}