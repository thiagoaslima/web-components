//@ts-check

/**
 * Debounce - essa função adia a execução da função recebida. Caso a função seja invocada novamente neste intervalo, o tempo de espera é reiniciado.
 * @param {Function} fn - função a ser adiada 
 * @param {number} timeout - valor, em milisegundos, que a função deve aguardar antes de ser executada
 * @returns {Function} retorna fn recebida, já com o comportamento de aguardar o tempo do timeout antes de sua execução
 */
export function debounce(fn, timeout = 200) {
    let timerId;

    return (...args) => {
        if (timerId) clearInterval(timerId);
        timerId = setTimeout(() => fn(...args), timeout)
    }
}