import React, {Fragment} from 'react'

export const Main = (props) => {
    return (
        <Fragment>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
};