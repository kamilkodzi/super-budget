import React, { useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import 'styled-components/macro';
import { groupBy } from 'lodash';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { selectParentCategory } from 'data/actions/budget.actions';

function BudgetCategoryList({
    budgetedCategories, allCategories, budget,
    selectParentCategory
}) {

    const handleClickParentCategoryRef = useRef(null);

    const budgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories,
            item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
        ),
        [budgetedCategories, allCategories]
    );

    const handleClearParentCategorySelect = useCallback(
        () => {
            selectParentCategory();
            handleClickParentCategoryRef.current()
        },
        [selectParentCategory, handleClickParentCategoryRef]
    )

    const handleSelectRestParentCategories = useCallback(
        () => {
            selectParentCategory(null);
            handleClickParentCategoryRef.current();
        },
        [selectParentCategory, handleClickParentCategoryRef]
    )

    const listItems = useMemo(
        () => Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
            id: parentName,
            Trigger: ({ onClick }) => (
                <ParentCategory
                    name={parentName}
                    onClick={() => {
                        onClick(parentName);
                        selectParentCategory(parentName);
                    }}
                    categories={categories}
                    transactions={budget.transactions}
                />
            ),
            children: categories.map(budgetedCategory => {

                const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);

                return (
                    <CategoryItem
                        key={budgetedCategory.id}
                        name={name}
                        item={budgetedCategory}
                        transactions={budget.transactions}
                    />
                )
            }),
        })),
        [allCategories,
            budget.transactions,
            budgetedCategoriesByParent,
            selectParentCategory]
    );

    const totalSpent = useMemo(
        () => budget.transactions
            .reduce((acc, transaction) => acc + transaction.amount, 0),
        [budget.transactions]
    );

    const restToSpent = useMemo(
        () => budget.totalAmount - totalSpent,
        [budget.totalAmount, totalSpent]
    );
    const amountTaken = useMemo(
        () => budgetedCategories.reduce((acc, budgetedCategory) => {
            const categoryTransactions = budget.transactions
                .filter(transaction => transaction.categoryId === budgetedCategory.id)
            const categoryExpenses = categoryTransactions
                .reduce((acc, transaction) => acc + transaction.amount, 0)

            return acc + Math.max(categoryExpenses, budgetedCategory.budget);
        }, 0),
        [budget.transactions, budgetedCategories]
    );

    const notBudgetedTransactions = useMemo(
        () => budget.transactions
            .filter(transaction => {
                return !budgetedCategories
                    .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
            }),
        [budget.transactions, budgetedCategories]
    );

    const notBudgetedExpenses = useMemo(
        () => notBudgetedTransactions
            .reduce((acc, transaction) => acc + transaction.amount, 0),
        [notBudgetedTransactions]
    )



    const availableForRestCategiries = useMemo(
        () => budget.totalAmount - amountTaken - notBudgetedExpenses,
        [budget.totalAmount, amountTaken, notBudgetedExpenses]
    )

    return (
        <div>
            <div
                css={`
                border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
            `}
            >
                <ParentCategory
                    name={budget.name}
                    amount={restToSpent}
                    onClick={handleClearParentCategorySelect}
                />
            </div>
            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />

            <div
                css={`
                border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
            `}
            >
                <ParentCategory
                    name='Other categories'
                    amount={availableForRestCategiries}
                    onClick={handleSelectRestParentCategories}
                />
            </div>
        </div>
    )
}

export default connect(state => ({
    budgetedCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget
}), {
    selectParentCategory
})(BudgetCategoryList)