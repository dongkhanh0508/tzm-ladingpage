import Footer from 'components-templates/dashboard/Footer';
import Sidebar from 'components-templates/dashboard/Sidebar';
import BrandMap from 'features/map/pages/BrandMap';
import TemplatesPage from 'features/template';
import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Tables from './Tables';
export default function DashboardIndex() {
  const match = useRouteMatch();
  return (
    <>
      <Sidebar />
      <div className="md:ml-64">
        <Switch>
          <Route exact path={match.url} component={Dashboard} />
          <Route path={`${match.url}/settings`} component={Settings} />
          <Route path={`${match.url}/tables`} component={Tables} />
          <Route path={`${match.url}/maps`} component={BrandMap} />
          <Route path={`${match.url}/templates`} component={TemplatesPage} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}
