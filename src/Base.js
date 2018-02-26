import React , {Component} from 'react';
import Orders from './Orders'
import { BrowserRouter, Route, Link} from 'react-router-dom';
import Dishes from "./Dishes";
import Drinks from "./Drinks";

class Base extends Component {
    render() {
        console.log(this.props.location);
        console.log(this.props.match);
        console.log(this.props.history);
        return(
            <div className='container'>
                <div className='jumbotron'>
                    <h2>Store name</h2>
                </div>

                <div>
                    <Link to="/dishes">Dishes</Link>
                    <Link to="/drinks">Drinks</Link>
                    <div>
                        <Route path="/dishes" component={Dishes}/>
                        <Route path="/drinks" component={Drinks}/>
                    </div>
                </div>
                <Orders/>
            </div>
        )
    }
}

export default Base;