ducksReducer ![building status](https://api.travis-ci.org/drpicox/ducks-reducer.svg?branch=master)
============

Combines reducers from redux-ducks modules into a single reducer.

It uses reducers defined as ducks, see
[ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)
(aka isolated modules), and creates a reducer
combining their reducers with 
[combineReducers](https://redux.js.org/docs/api/combineReducers.html).


Quick Use
---------

Install with npm:

```bash
npm install ducks-reducer
```

```javascript
import ducksReducer from 'ducks-reducer'

import * as comments from './comments'
import * as posts from './posts'
import * as users from './users'

const reducer = ducksReducer({ comments, posts, users })

// ...do your stuff...

const store = createStore(reducer, preloadedState, enhancer)

// ...do your stuff...
```


ducksReducer(_ducks_)
---------------------

It creates a reducer with `combineReducers` with all the reducers
of the given reducers.

By default, it assumes that ducks are esModules and it looks for
the `default` property which is suposed to be the reducer:

```javascript
const reducer = ducksReducer({ comments, posts, users })
// ^ this is equivalent to v
const reducer = combineReducers({
  comments: comments.default,
  posts: posts.default,
  users: users.default,
})
```

If `default` is not found in any duck, then it assumes that it may be
an ES5 module. Then it looks for the duck itself, if it is a function, 
then it is considered the reducer.

```javascript
const reducer = ducksReducer({ comments, posts, users })
// ^ this is equivalent to v
const reducer = combineReducers({ comments, posts, users })
```

If the duck does not have a `default` and the duck itself is not a function,
then it assumes that there is no reducer for that duck.

It supports to combine all three kinds of ducks 
(es6 modules, es5 modules and with no reducer).

```javascript
const reducer = ducksReducer({ comments, posts, users })
// ^ this is equivalent to v
const reducer = combineReducers({
  comments: comments.default, // it was es6 module
  posts: posts,               // it was es5 module
                              // users had no reducer
})
```


See also
--------

[ducks-middleware](https://github.com/drpicox/ducks-middleware) to compose
ducks middlewares.

```javascript
import ducksReducer from 'ducks-reducer'
import ducksMiddleware from 'ducks-middleware'

import * as comments from './comments'
import * as posts from './posts'
import * as users from './users'

const ducks = { comments, posts, users }
const reducer = ducksReducer(ducks)
const middleware = ducksMiddleware(ducks)

// ...do your stuff...

const store = createStore(
  reducer, 
  preloadedState, 
  applyMiddleware(middleware)
)

// ...do your stuff...
```
