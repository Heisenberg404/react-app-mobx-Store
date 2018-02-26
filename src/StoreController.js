import { extendObservable, computed } from 'mobx';

class StoreController {
    constructor() {
        extendObservable(this, {
            dishes: [
                {name: 'Frijol', desc: 'description 1', price: 100, quantity: 0},
                {name: 'Lenteja', desc: 'description 2', price: 150, quantity: 0},
                {name: 'Avena', desc: 'description 3', price: 200, quantity: 0}
            ],
            bebidas: [
                {name: 'Jugo mango', desc: 'description 1', price: 10, quantity: 0},
                {name: 'Jugo Fresa', desc: 'description 2', price: 20, quantity: 0},
                {name: 'Jugo mandarina', desc: 'description 3', price: 15, quantity: 0}
            ]
        });
    }

    addToOrder(indexDish, quantityDishes) {
        this.dishes.forEach((value, index) => {
            if (indexDish === index) {
                    this.dishes[index].quantity = quantityDishes;
                }
            }
        )
    }

    addDrinkToOrder(indexDrink, quantityDrink) {
        this.bebidas.forEach((value, index) => {
                if (indexDrink === index) {
                    this.bebidas[index].quantity = quantityDrink;
                }
            }
        )
    }
}

var storeController = new StoreController;

export default storeController;