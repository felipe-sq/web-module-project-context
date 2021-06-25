import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : []);
	// refactored for 2nd stretch goal using localStorage

	const addItem = item => {
		// add the given item to the cart
		const addedItem = [...cart, item];
		setCart(addedItem);
		localStorage.setItem('Cart', JSON.stringify(addedItem));
		//refactored for localStorage stretch goal
	};

	// Stretch Goal for removing item from cart
	const removeItem = (id) => {
		const itemID = [...cart.filter(item => item.id !== id)];
		setCart(itemID);
		// 2nd stretch goal: using localStorage to persist Cart Items

		if (itemID.length === 0) {
			localStorage.removeItem('Cart');
		} else {
			localStorage.setItem('Cart', JSON.stringify(itemID));
		}
	};

	return (
		<div className="App">
			<ProductContext.Provider value={{products, addItem}}>
				<CartContext.Provider value={{cart, removeItem}}>
					<Navigation />

					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>

					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
