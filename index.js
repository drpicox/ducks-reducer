var combineReducers = require('redux').combineReducers

function ducksReducer(ducks) {
  var reducers = {}

  Object.keys(ducks).forEach(function(key) {
    var duck = ducks[key]
    if (typeof duck.default === 'function') {
      reducers[key] = duck.default
    } else if (typeof duck === 'function') {
      reducers[key] = duck
    }
  })

  return combineReducers(reducers)
}

module.exports = ducksReducer
