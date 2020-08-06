import React from 'react';

import CartItem from './CartItem';

const CartProducts = ({ addressData, inputQuantityValue, handleChangeInput, removeHandler, cartItems }) => {
    return (
        <div>
            <div className="card card-body border-0">
                <h3 className="mb-1 text-center">{Object.keys(cartItems).length > 0 && cartItems[Object.keys(cartItems)[0]].productTitle}</h3>
                {
                    Object.keys(cartItems).map(product => (
                        <CartItem
                            key={product.id}
                            inputQuantityValue={inputQuantityValue[product]}
                            removeHandler={() => removeHandler(product)}
                            handleChangeInput={(type) => handleChangeInput(product, type)}
                            productImage={cartItems[product].productImage}
                            productTitle={cartItems[product].productTitle}
                            quantity={cartItems[product].quantity}
                            variantName={cartItems[product].variantName}
                            price={cartItems[product].price}
                        />
                    )
                    )
                }
            </div>
            {addressData.length > 0 && (
                <div className="card card-body border-2">
                    <h4 style={{
                        textDecoration: 'underline'
                    }}>Address:</h4>
                    <hr />
                    <address class="vcard">
                        {addressData.map(addressFields => addressFields.value.length > 0 && (
                            <span className="row">
                                <span className="adr col-4">
                                    <span>{addressFields.displayName} : </span>
                                </span>
                                <hr />
                                <span style={{
                                    wordBreak: 'break-word'
                                }} className="adr col-8">
                                    <span class="street-address">{addressFields.value}.</span>
                                </span>
                            </span>
                        ))}
                    </address>
                </div>
            )}
        </div>
    );
}

export default CartProducts;