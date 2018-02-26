import React, {Component} from 'react';

class Order extends Component {

    updateValue(event) {
        this.props.doOrder(this.props.indice, event.target.value);
    }

    render() {
        return(
            <div>
                <br/>
                <label>Quantity: </label>
                <input type='number' min='0' max='20' onChange={this.updateValue.bind(this)}/>
                <label className='EspacioPlatillo'>Price: {this.props.price}</label>
            </div>
        )
    }
}

export default Order;

