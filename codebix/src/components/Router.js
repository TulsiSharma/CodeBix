import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import App from "./App";
import Files from "./Files";
const Router=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/files" component={Files} ></Route>
                <Route path="/files/:user/:id" component={App}></Route>
            </Switch>
        </BrowserRouter>
    );
}
export default Router;