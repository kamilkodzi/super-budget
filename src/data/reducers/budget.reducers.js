import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,
    LOADING_STATES,
    BUDGET_CATEGORIES_GET_SUCCESS,
    BUDGET_CATEGORIES_GET_REQUEST,
    BUDGET_CATEGORIES_GET_FAILURE,
    SET_SELECTED_PARENT_CATEGORY_ID,
    BUDGET_TRANSACTION_ADD_REQUEST,
    BUDGET_TRANSACTION_ADD_SUCCESS,
} from 'data/constants';

const iniialState = {
    loadingState: null,
    budget: {},
    budgetCategories: [],
    selectedParentCategoryId: undefined,
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

        case BUDGET_TRANSACTION_ADD_REQUEST:
            return {
                ...state,
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }
        case BUDGET_TRANSACTION_ADD_SUCCESS:
            delete newLoadingState.BUDGET_CATEGORIES_GET_REQUEST;
            return {
                ...state,
                budget: {
                    ...state.budget,
                    transactions: [
                        action.payload,
                        ...state.budget.transaction,
                    ]
                },
                loadingState: newLoadingState,
            }




        case SET_SELECTED_PARENT_CATEGORY_ID:
            return {
                ...state,
                selectedParentCategoryId: action.payload
            }


        default:
            return state;
    }
}
export default budget;