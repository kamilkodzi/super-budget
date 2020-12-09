import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    LOADING_STATES,
    BUDGET_CATEGORIES_GET_SUCCESS,
    BUDGET_CATEGORIES_GET_REQUEST,
    BUDGET_CATEGORIES_GET_FAILURE,
} from 'data/constants';

const iniialState = {
    loadingState: null,
    budget: {},
    budgetCategories: [],
}

function budget(state = iniialState, action) {
    const newLoadingState = { ...state.loadingState };

    switch (action.type) {
        case BUDGET_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }
        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state,
                budget: action.payload,
                loadingState: newLoadingState
            }
        case BUDGET_GET_FAILURE:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state,
                budget: {},
                loadingState: newLoadingState
            }

        case BUDGET_CATEGORIES_GET_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }
        case BUDGET_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST;
            return {
                ...state,
                budgetCategories: action.payload,
                loadingState: newLoadingState,
            }
        case BUDGET_CATEGORIES_GET_FAILURE:
            delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST;
            return {
                ...state,
                budgetCategories: [],
                loadingState: newLoadingState
            }



        default:
            return state;
    }
}
export default budget;