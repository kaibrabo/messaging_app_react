import React from "react";

const User = props => {
  const authButton = !props.user ? (
    <button onClick={props.handleSignIn}>sign in</button>
  ) : (
    <div className="auth-button">
      <p>{props.user.displayName}</p>
      <button onClick={props.handleSignOut}>sign out</button>
    </div>
  );
  return <div className="user-container">{authButton}</div>;
};

export default User;
