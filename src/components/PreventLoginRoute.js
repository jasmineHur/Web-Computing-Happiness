
import { Route, Redirect } from 'react-router-dom'

const PreventLoginRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("token");

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to / page
    <Route
      {...rest}
      render={(props) => ((isLogin == null || isLogin == undefined || isLogin == 'undefined') ? <Component {...props} />  : <Redirect to="/" />)}
    />
  );
};

export default PreventLoginRoute;