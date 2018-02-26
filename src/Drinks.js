import React, { Component } from 'react';
import './Dishes.css';
import logo from './logo.svg';
import storeController from './StoreController';
import Order from './Order';

class Drinks extends Component{
	render(){
		let bebidas_div = [];

		const llenar_array_bebidas_div = storeController.bebidas.forEach(
			(value, index)=>(
				bebidas_div.push(
					<div className="list-group-item" key={index}>
						<div className="panel-body">
							<img role="presentation" src={logo} className="ImagenPlatillo"/>
							<h2 className="TitlePlatillo"> {value.name} </h2>
							<div className="DescripcionPlatillo"> {value.desc} </div>
							<Order price={value.price} indice={index}
								   doOrder={(indice_d, evento_d)=>
							{storeController.addDrinkToOrder(indice_d, evento_d)}}/>
						</div>
					</div>
					)
				)
			)


		return(
			<div className="container col-md-6">
			<div>
				<div className="panel panel-primary">
					<div className="list-group Platillo-Menu">
					{bebidas_div}

					</div>
				</div>
			</div>
			</div>
			);
	}
}

export default Drinks;