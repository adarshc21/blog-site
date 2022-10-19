module.exports = (passedFn) => (req, res, next) => {
  Promise.resolve(passedFn(req, res, next)).catch(next);
}