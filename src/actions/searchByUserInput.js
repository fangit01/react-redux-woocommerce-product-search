import WooCommerceAPI from 'woocommerce-api';
var WooCommerce = new WooCommerceAPI({
    url: 'https://', // Your store URL
    consumerKey: 'ck_', // Your consumer key
    consumerSecret: 'cs_', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v2' // WooCommerce WP REST API version
});


// search by id api returns an array with one object;if no item found return an empty array
export const searchBySku = (sku) => {
    return dispatch => {
        dispatch({ type: 'change_search_status' });
        console.log(WooCommerce.getAsync(`products?sku=${sku}`));
        WooCommerce.getAsync(`products?sku=${sku}`).then((result) => {
            console.log('result from action:', result);
            if (result.statusCode === 200 && (JSON.parse(result.body)).length !== 0) {
                const data = JSON.parse(result.body);
                dispatch({
                    type: 'SEARCH_BY_SKU',
                    payload: data
                })
            }
            else if (result.statusCode === 200 && JSON.parse(result.body).length === 0) {
                dispatch({
                    type: 'item not found'
                })
            } else {
                dispatch({
                    type: 'error'
                })
            }
        })
    }
};


// search by id api returns an object
export const searchById = (id) => {
    return dispatch => {
        dispatch({ type: 'change_search_status' });
        WooCommerce.getAsync(`products/${id}`).then((result) => {
            console.log('result from action:', result);
            if (result.statusCode === 200) {
                const data = JSON.parse(result.body);
                dispatch({
                    type: 'SEARCH_BY_ID',
                    payload: data
                })
            }
            else if (result.statusCode === 404) {
                dispatch({
                    type: 'item not found'
                })
            } else {
                dispatch({
                    type: 'error'
                })
            }
        })
    }
};

// search by keywords/author api returns an array of mutiple objecs, if no item found return an empty array
export const searchByAuthor = (userInput) => {
    return dispatch => {
        dispatch({ type: 'change_search_status' });
        WooCommerce.getAsync(`products?search=${userInput}&per_page=100`).then((result) => {
            console.log(result);

            if (result.statusCode === 200 && (JSON.parse(result.body)).length !== 0) {
                const data = JSON.parse(result.body);
                console.log("@@@@@@@@@ unfiltered array: ", data);
                const filtered_array = data.filter(el => el.attributes[0].options[0].includes(userInput));
                console.log("######### filtered array: ", filtered_array);

                if (filtered_array.length !== 0) {
                    dispatch({
                        type: 'SEARCH_BY_AUTHOR',
                        payload: filtered_array
                    })
                }
                else {
                    dispatch({
                        type: 'item not found'
                    })
                }
            }
            else if (result.statusCode === 200 && (JSON.parse(result.body)).length === 0) {
                dispatch({
                    type: 'item not found'
                })
            } else {
                dispatch({
                    type: 'error'
                })
            }
        })
    }
};



export const searchByKeywords = (userInput) => {
    return dispatch => {
        dispatch({ type: 'change_search_status' });
        WooCommerce.getAsync(`products?search=${userInput}&per_page=100`).then((result) => {
            if (result.statusCode === 200 && (JSON.parse(result.body)).length !== 0) {
                const data = JSON.parse(result.body);
                console.log("@@@@@@@@@ unfiltered array: ", data);

                const filtered_array = data.filter(el => el.name.includes(userInput));
                console.log("######### filtered array: ", filtered_array);

                if (filtered_array.length !== 0) {
                    dispatch({
                        type: 'SEARCH_BY_AUTHOR',
                        payload: filtered_array
                    })
                }
                else {
                    dispatch({
                        type: 'item not found'
                    })
                }
            }
            else if (result.statusCode === 200 && (JSON.parse(result.body)).length === 0) {
                dispatch({
                    type: 'item not found'
                })
            } else {
                dispatch({
                    type: 'error'
                })
            }
        })
    }
};


