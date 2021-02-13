import React from 'react';
import { ParentCategory as Root } from './BudgetCategoryList.css';

function ParentCategory({ name, onClick }) {

    return (
        <Root onClick={onClick}>
            {name}
        </Root>
    )
}

export default ParentCategory