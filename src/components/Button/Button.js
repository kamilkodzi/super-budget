import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { InlineButton, RegularButton } from './Button.css';

const Button = ({ variant, children, ...props }) => {
    const { to } = props;
    const Component = useMemo(() => {
        switch (variant) {
            case 'inline':
                return InlineButton
            case 'regular':
                return RegularButton

            default:
                return RegularButton
        }
    }, [variant]);

    const content = useMemo(() => (
        <Component {...props}>
            {children}
        </Component>
    ), [children, props])

    return to ? (
        <Link {...props}>
            {content}
        </Link>
    ) : (
            <Fragment>
                {content}
            </Fragment>
        )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['inline', 'regular'])
}


export default Button;