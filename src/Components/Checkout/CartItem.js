import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../icons'


const CartItem = ({ inputQuantityValue, removeHandler, handleChangeInput, productImage, productTitle, price, quantity, variantName }) => {
    return (
        <div>
            <hr />
            <div className="row no-gutters py-2">
                <div className="col-sm-2 col-2 p-2">
                    <img
                        alt="alt cart Image"
                        style={{ margin: "0 auto", maxHeight: "50px" }}
                        src={productImage} className="img-fluid d-block" />
                </div>
                <div className="col-sm-4 col-4">
                    <h5 className="mb-1">{variantName}</h5>
                    <p className="mb-1">Price: ₹{price} </p>

                </div>
                <div className="col-sm-2 col-4 text-center ">
                    <p className="mb-0">Qty: {inputQuantityValue}</p>
                </div>

                <div className="col-sm-4 text-right">
                    <button
                        onClick={() => handleChangeInput('add')}
                        className="btn btn-primary btn-sm mr-2 mb-1">
                        <PlusCircleIcon width={"20px"} />
                    </button>
                    {inputQuantityValue > 1 &&
                        <button
                            onClick={() => handleChangeInput('sub')}
                            className="btn btn-danger btn-sm mb-1">
                            <MinusCircleIcon width={"20px"} />
                        </button>}
                    {inputQuantityValue === 1 &&
                        <button
                            onClick={removeHandler}
                            className="btn btn-danger btn-sm mb-1">
                            <TrashIcon width={"20px"} />
                        </button>}
                </div>
            </div>
        </div>
    );
}

export default CartItem;