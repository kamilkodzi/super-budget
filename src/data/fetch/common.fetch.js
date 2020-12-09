export const fetchAllCategories = () => {
    const promise = fetch(`${process.env.REACT_APP_API_LOCAL_URL}/categories/?_expand=parentCategory`)

    return promise;
}