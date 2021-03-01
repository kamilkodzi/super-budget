import {
    BUDGET_GET,
    BUDGET_CATEGORIES_GET,
    SET_SELECTED_PARENT_CATEGORY_ID,
} from 'data/constants';

import API from 'data/fetch';

export const fetchBudget = (id) => {
    const promise = API.budget.fetchBudget(id);

    return {
        type: BUDGET_GET,
        promise,
    }
}

export const fetchBudgetedCategories = (id) => {
    const promise = API.budget.fetchBudgetCategories(id);

    return {
        type: BUDGET_CATEGORIES_GET,
        promise,
    }

}

export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id,
    }
}