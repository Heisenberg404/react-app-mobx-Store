import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Base from "./Base";
import Dishes from "./Dishes";
import Drinks from "./Drinks";

const router = (
    <BrowserRouter>
        <Route path="/" component={Base}/>
    </BrowserRouter>
);

ReactDOM.render(
    router,
    document.getElementById("root")
);
