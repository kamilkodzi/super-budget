import React from 'react';
import styled from 'styled-components'

import { Wrapper } from 'components'


const Container = styled.div`
background-color:${({ theme }) => theme.colors.gray.light};
display:flex;
padding:${({ theme }) => theme.spacing.sm}px 0;
justify-content: space-between;
`

const List = styled.ul`
display:flex;
`

const Navigation = ({ items }) => {
    return (
        <Container>
            <Wrapper>
                <List>
                    {items.map(item => (
                        <li>
                            <a>{item.content}</a>
                        </li>
                    ))}
                </List>
            </Wrapper>
        </Container>
    )
}

export default Navigation
