export const formatCurrency = value => {
    const number = Number(value);


    return new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(number)
}