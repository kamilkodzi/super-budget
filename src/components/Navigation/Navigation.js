import React from 'react';
import PropTypes from 'prop-types';
import { Container, NavigationWrapper, List } from './Navigation.css';
import { useTranslation } from 'react-i18next';
import { Button } from 'components';

const Navigation = ({ items = [], RightElement }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Button variant="inline" to={item.to}>{t(item.content)}</Button>
                        </li>
                    ))}
                </List>
                {RightElement}
            </NavigationWrapper>
        </Container>
    )
}

Navigation.propTypes = {
    items: PropTypes.array.isRequired
};


export default Navigation
