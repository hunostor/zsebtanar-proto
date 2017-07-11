import {
  EXERCISE_CHECK_FAIL,
  EXERCISE_CHECK_SUCCESS,
  EXERCISE_GET,
  EXERCISE_GET_ALL,
  HINT_GET
} from '../actions/exercise'

const INIT_STATE = {
  active: null,
  list: []
}

export default function exerciseWorkflow (state = INIT_STATE, action) {
  switch (action.type) {
    case EXERCISE_GET_ALL:
      return {...state, list: action.payload}
    case EXERCISE_GET:
      return {...state, active: {details: action.payload, state: 'in-progress', validity: null}}
    case EXERCISE_CHECK_SUCCESS:
      return {...state, active: {...state.active, state: 'success', validity: action.payload}}
    case EXERCISE_CHECK_FAIL:
      return {...state, active: {...state.active, state: 'fail', validity: action.payload}}
    case HINT_GET:
      const hints = (state.active.hints || []).concat(action.payload)
      return {...state, active: {...state.active, hints}}
    default:
      return state
  }
}
