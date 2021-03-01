import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from './BudgetTransactionList.css'
import { groupBy } from 'lodash';
import { formatCurrency, formatDate } from 'utils';

function BudgetTransactionList({ transactions, allCategories }) {
    const grupedTransactions = groupBy(
        transactions,
        transaction => new Date(transaction.date).getUTCDate()
    )
    console.log(grupedTransactions)
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
    allCategories: state.common.allCategories,
}))(BudgetTransactionList);