
/* !
 * series-each
 * async series each
 *
 * @copyright 2013 Enrico Marino
 * @license MIT
 */

/*
 * Expose `series_each`
 */
 
module.exports = series_each;

/*
 * series_each
 * Apply 'iterator' to each item in 'array' in series
 * and call 'callback' when done
 *
 * @param {Array} array array
 * @param {Function} iterator iterator
 * @param {Function} callback callback
 * @api public
 */

series_each = function (array, iterator, callback) {
  var completed = 0;
  var len = array.length;
  
  function complete (err) {
    if (err) {
      callback(err);
      callback = function () {};
      return;
    }
    completed += 1;
    if (completed === len) {
      callback();
      return;
    }
    iterate();
  }

  function iterate () {
    iterator(array[completed], complete);
  }

  iterate();
};
