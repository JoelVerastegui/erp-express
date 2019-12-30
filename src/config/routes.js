import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* ===== COMPONENTS ===== */
import Content from '../components/body/Content';
import Articulo from '../components/modules/mm/transaction/articulo/Articulo';
import Sociedad from '../components/modules/mm/transaction/sociedad/Sociedad';
import Login from '../components/modules/sys/Login';
/* ====================== */


function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Content} />
            <Route exact path="/articulo" component={Articulo} />
            <Route exact path="/sociedad" component={Sociedad} />
            <Route exact path="/login" component={Login} />
        </Switch>
    )
}

export default Routes;