import React, {Component} from 'react';
import storeController from "./StoreController";
import { observer } from 'mobx-react';

class Orders extends Component {
    render() {

        let dishesAdded = [];
        let drinksAdded = [];

        const fullDishesAdded = storeController.dishes.forEach(
            (value, index) => {
                if (value.quantity !== 0) {
                    dishesAdded.push(
                        <div className="list-group-item" key={index}>
                            <div className="panel-body">
                                <h4>{value.name}</h4><br/>
                                <div className="APrecioCantidad">
                                    <span>Cantidad: {value.quantity}</span>
                                    <span className="PrecioPlatillo">Precio: {value.quantity * value.price}</span>
                                </div>

                            </div>
                        </div>
                    )

                }
            }
        )

        const fullDrinksAdded = storeController.bebidas.forEach(
            (value, index) => {
                if (value.quantity !== 0) {
                    drinksAdded.push(
                        <div className="list-group-item" key={index}>
                            <div className="panel-body">
                                <h4>{value.name}</h4><br/>
                                <div className="APrecioCantidad">
                                    <span>Cantidad: {value.quantity}</span>
                                    <span className="PrecioPlatillo">Precio: {value.quantity * value.price}</span>
                                </div>

                            </div>
                        </div>
                    )

                }
            }
        )

        return (
            <div className="container col-md-6">
                <div>
                    <div className="panel panel-primary">
                        <div className="list-group Pedidos-Menu">
                            {dishesAdded}
                            {drinksAdded}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Orders);