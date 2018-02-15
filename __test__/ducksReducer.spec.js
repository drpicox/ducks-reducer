const ducksReducer = require('../')

describe('ducksReducer', () => {
  const es6Duck = {
    default: () => true,
  }
  const es5Duck = () => true
  const duckWithoutReducer = {}

  it('creates a reducer from es6 modules', () => {
    const reducer = ducksReducer({ es6Duck })
    const state = reducer(undefined, {})

    expect(state).toEqual({ es6Duck: true })
  })

  it('creates a reducer from es5 modules', () => {
    const reducer = ducksReducer({ es5Duck })
    const state = reducer(undefined, {})

    expect(state).toEqual({ es5Duck: true })
  })

  it('creates a valid reducer from modules without reducer', () => {
    const reducer = ducksReducer({ duckWithoutReducer })
    const state = reducer(undefined, {})

    expect(state).toEqual({})
  })

  it('allows to mix kinds of modules', () => {
    const reducer = ducksReducer({ es6Duck, es5Duck, duckWithoutReducer })
    const state = reducer(undefined, {})

    expect(state).toEqual({ es6Duck: true, es5Duck: true })
  })
})
