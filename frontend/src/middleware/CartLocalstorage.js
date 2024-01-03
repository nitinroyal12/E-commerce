
const Cartlocalstorage = (store) => (next) => (action) => {
   
    const result = next(action);
  
    if (action.type === 'cart/additem' || action.type === 'cart/removeitem') {
      const cartData = store.getState().cart;
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  
    return result;
  };
  
  export default Cartlocalstorage;
  