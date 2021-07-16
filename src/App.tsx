// Font Awesome Style Sheet
import '@fortawesome/fontawesome-free/css/all.min.css';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';
import { PrivateRoute } from 'components/Common/PrivateRoute';
import DashboardIndex from 'features/dashboard/pages';
import Landing from 'features/landingpage/pages/Landing';
import Login from 'features/landingpage/pages/Login';
import Profile from 'features/landingpage/pages/Profile';
import Register from 'features/landingpage/pages/Register';
import BioPage from 'features/template/BioPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile-store/:storeId/template/:templateId" component={BioPage} />
        <PrivateRoute path="/dashboard" component={DashboardIndex} />
      </Switch>
    </div>
  );
}

export default App;
