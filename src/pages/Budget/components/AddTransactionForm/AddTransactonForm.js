import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { groupBy } from 'lodash';



const required = value => (value ? undefined : 'Required');


function AddTransactionForm({ onSubmit = () => { }, categories, groupCategoriesBy }) {

    const groupedCategoriesByParentName = groupCategoriesBy
        ? groupBy(categories, groupCategoriesBy)
        : null;

    const categoryItems = useMemo(
        () => groupedCategoriesByParentName
            ? Object.entries(groupedCategoriesByParentName)
                .map(([parentName, categories]) => (
                    <optgroup key={parentName} label={parentName}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </optgroup>
                ))
            :
            categories.map(category => (
                <option value={category.id}>{category.name}</option>
            ))
        ,
        [groupedCategoriesByParentName, categories]
    )

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="description" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Description</label>
                                <input {...input} type="text" placeholder="Description" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                    <Field name="amount" validate={required} parse={value => parseFloat(value, 10)}>
                        {({ input, meta }) => (
                            <div>
                                <label>Amount</label>
                                <input {...input} type="number" step="0.01" placeholder="Amount" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                    <Field name="categoryId" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Category</label>
                                <select {...input}>
                                    {categoryItems}
                                </select>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                    <Field name="date" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Date</label>
                                <input {...input} type="date" placeholder="Date" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <div className="buttons">
                        <button type="submit" disabled={submitting}>
                            Submit
            </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
            </button>
                    </div>
                </form>
            )}
        />
    )
}

export default AddTransactionForm;