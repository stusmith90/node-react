import { COUNTER, AUTH } from './constants';

const INITIAL_STATE = {
  counter: 1,
  auth: {
    isLoading: true,
    user: null,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTER:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case AUTH:
      return {
        ...state,
        auth: {
          user: action.profile,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default reducer;
