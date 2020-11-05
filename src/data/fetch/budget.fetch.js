export const fetchBudget = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_LOCAL_URL}/budgets/${id}/?_embed=transactions`)

    return promise;
}

export const fetchBudgetCategories = (id) => {
    const promise = fetch(`${process.env.REACT_APP_API_LOCAL_URL}/budgets/${id}/budgetCategories`)

    return promise;
}