import { COUNTER } from './constants';

const INITIAL_STATE = {
    counter: 1,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COUNTER:
            return {
                ...state,
                counter: state.counter + 1,
            };

            default: return state;
}
}

export default reducer;