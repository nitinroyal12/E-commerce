const Wishlistlocalstorage = (store)=> (next) => (action) =>{
    const result = next(action)

    if(action.type === 'wishlist/additemtowishlist' || action.type === "wishlist/Removetowishlist"){
        const wishdata = store.getState().wish
        localStorage.setItem('wishlist', JSON.stringify(wishdata));
    }
    return result;
}

export default Wishlistlocalstorage