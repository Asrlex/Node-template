/**
 * Wrapper para try-catch de errores
 * @param {function} fn - función que se envuelve
 * @returns devuelve la propia función encapsulada
 */
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}