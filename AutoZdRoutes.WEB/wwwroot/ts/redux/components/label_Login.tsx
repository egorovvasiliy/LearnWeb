import * as React from 'react';
export const Label_Login = (props: {username:string }) => {
    let { username } = props;
    return <React.Fragment>
                <div className="Centered">{username}</div>
           </React.Fragment>
}