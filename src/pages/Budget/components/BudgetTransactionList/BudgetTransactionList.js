import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from './BudgetTransactionList.css'
import { groupBy } from 'lodash';
import { formatCurrency, formatDate } from 'utils';

function BudgetTransactionList({
    transactions, allCategories, budgetedCategories, selectedParentCategoryId
}) {
    const filteredTransactionsBySelectedParentCategory = useMemo(
        () => {
            if (typeof selectedParentCategoryId === 'undefined') {
                return transactions;
            }

            if (selectedParentCategoryId === null) {
                return transactions.filter(transaction => {
                    const hasBudgetedCategory = budgetedCategories
                        .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId);
                    return !hasBudgetedCategory;
                })
            }

            return transactions
                .filter(transaction => {
                    try {
                        const category = allCategories
                            .find(category => category.id === transaction.categoryId);
                        const parentCategoryName = category.parentCategory.name;

                        return parentCategoryName === selectedParentCategoryId
                    } catch (error) {
                        return false
                    }

                })

        },
        [allCategories, budgetedCategories, selectedParentCategoryId, transactions]
    );



    const grupedTransactions = useMemo(
        () => groupBy(
            filteredTransactionsBySelectedParentCategory,
            transaction => new Date(transaction.date).getUTCDate()
        ),
        [filteredTransactionsBySelectedParentCategory]
    )

    return (
        <List>
            {Object.entries(grupedTransactions).map(([key, transactions]) => (
                <li>
                    <ul>
                        {transactions.map(transaction => (
                            <ListItem>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>
                                    {(allCategories.find(category => category.id === transaction.categoryId) || {}).name}
                                </div>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    )
};

export default connect(state => ({
    transactions: state.budget.budget.transactions,
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId
}))(BudgetTransactionList);