import React from 'react'
import { Alert } from '@material-ui/lab';

const ProductInfo = props => {
    const { products, buyNowDisabled, isNotAvailable, buyNowWrapperClick, currentVariantIndex, goToCart, addProducts } = props;
    return (
        <div className="productContent">
            <h1>{products[0].productTitle}</h1>
            <div className="productPriceContainer">Price</div>
            <div className="productPriceValue"><b>₹ {products[0].productVariant[currentVariantIndex].productPrice}</b></div>
            {isNotAvailable && <Alert severity="error">This product is not available!</Alert>}
            <br />
            <div className="productDescription">

            </div>
            <div>
                <div className="buyNowButtonContainer">
                    <div>
                        {!isNotAvailable && (
                            <button onClick={goToCart ? buyNowWrapperClick : addProducts} className="addToCart" >
                                {goToCart ? 'Go To Cart' : 'Add To Cart'}
                            </button>
                        )}
                    </div>
                    <div>
                        {isNotAvailable ? (
                            <button className="buyNow" disabled={true} style={{
                                backgroundColor: '#dddddd',
                                marginTop: '20px',
                                marginBottom: '30px'
                            }} >
                                Buy Now
                            </button>
                        ) : (
                                <button onClick={buyNowWrapperClick} className="buyNow" disabled={buyNowDisabled} style={{
                                    backgroundColor: buyNowDisabled ? '#dddddd' : null,
                                    marginTop: '20px',
                                    marginBottom: '30px'
                                }} >
                                    Buy Now
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo