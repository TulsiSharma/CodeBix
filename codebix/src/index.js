import React from "react";
import {render} from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css"
import '../node_modules/codemirror/lib/codemirror.js';
import '../node_modules/codemirror/lib/codemirror.css';
import Router from "./components/Router";
render(<Router/>,document.querySelector("#root"));