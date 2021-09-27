import {Switch, Route, Redirect} from 'react-router-dom'
import Links from './components/Links';
import DetailLink from './components/DetailLink';
import CreateLink from './components/CreateLink';
import Auth from './components/Auth';

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <CreateLink />
                </Route>
                <Route path="/detail/:id">
                    <DetailLink />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}