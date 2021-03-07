import React from 'react';
import { createPortal } from 'react-dom';
import { Wrapper, Content, CloseIcon } from './Modal.css';
import { useHistory } from 'react-router-dom';

function Modal({ children }) {
    const history = useHistory();
    console.log({ history })
    return createPortal(
        <Wrapper>
            <Content>
                <CloseIcon onClick={history.goBack}>&times;</CloseIcon>
                {children}
            </Content>
        </Wrapper>, document.querySelector('#modal')
    )
};

export default Modal;