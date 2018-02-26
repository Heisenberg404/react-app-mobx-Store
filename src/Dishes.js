import React, {Component} from 'react';
import './Dishes.css';
import logo from './logo.svg';
import storeController from './StoreController'
import Order from "./Order";


class Dishes extends Component {
    render() {

        let dishesDiv = [];
        const fillArrayDishesDiv = storeController.dishes.forEach(
            (value, index) => (
                dishesDiv.push(
                    <div className='list-group-item' key={index}>
                        <div className='panel-body'>
                            <img role='presentation' src={logo} className='ImagenPlatillo'/>
                            <h2 className='TitlePlatillo'>{value.name}</h2>
                            <div className='DescripcionPlatillo'>{value.desc}</div>
                            <Order price={value.price} indice = {index} doOrder={(index_d, event_d) =>
                                    { storeController.addToOrder(index_d, event_d) }}/>
                        </div>
                    </div>
                )
            )
        )

        return(
            <div className='container col-md-6'>
                <div>
                    <div className='panel panel-primary'>
                        <div className='list-group Platillo-Menu'>
                            {dishesDiv}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dishes;