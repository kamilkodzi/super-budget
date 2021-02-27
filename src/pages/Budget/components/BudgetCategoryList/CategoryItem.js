import React from 'react';
import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css';
import { formatCurrency } from 'utils';

function CategoryItem({ name, item, transactions }) {

    const categoryTransactions = transactions
        .filter(transaction => transaction.categoryId === item.id)

    const spentOnCategory = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalLeft = item.budget - spentOnCategory;

    return (
        <Root >
            <span>{name}</span>
            <CategoryAmount negative={totalLeft < 0}>
                {formatCurrency(totalLeft)}
            </CategoryAmount>
        </Root>
    )
}

export default CategoryItem