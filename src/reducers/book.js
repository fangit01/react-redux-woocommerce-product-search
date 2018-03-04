var initial_state = {
    search_status: 'Please enter to search',
    product_id: '',
    product_sku: '',
    author_keywords: '',
    title_keywords: ''
}

export default function (state = initial_state, action) {
    switch (action.type) {

        case 'PASS_INPUT_ID':
            return {
                ...state,
                product_sku: '',
                product_id: action.payload,
            }

        case 'PASS_INPUT_SKU':
            return {
                ...state,
                product_id: '',
                product_sku: action.payload,
            }

        case 'PASS_INPUT_AUTHOR':
            return {
                ...state,
                author_keywords: action.payload,
                product_id: '',
                title_keywords: '',
                product_sku: ''
            }

        case 'PASS_INPUT_KEYWORDS':
            return {
                ...state,
                title_keywords: action.payload,
                product_id: '',
                product_sku: '',
                author_keywords: ''
            }

        case 'change_search_status':
            return {
                ...state,
                search_status: 'Searching now...'
            }


        case 'item not found':
            return {
                ...state,
                search_status: 'Item not found'
            }


        case 'error':
            return {
                ...state,
                search_status: 'There is an error fetching the data'
            }

        case 'SEARCH_BY_SKU':
            var book = action.payload[0];
            return {
                ...state,
                search_status: 'Success',
                product_name: book.name,
                product_author: book.attributes[0].options[0],
                product_id: book.id,
                product_sku: book.sku,
                product_status: book.status,
                product_regular_price: book.regular_price,
                product_stock_quantity: book.stock_quantity
            };


        case 'SEARCH_BY_ID':
            return {
                ...state,
                search_status: 'Success',
                product_name: action.payload.name,
                product_author: action.payload.attributes[0].options[0],
                product_id: action.payload.id,
                product_sku: action.payload.sku,
                product_status: action.payload.status,
                product_regular_price: action.payload.regular_price,
                product_stock_quantity: action.payload.stock_quantity
            };

        case 'SEARCH_BY_AUTHOR':
            return {
                ...state,
                search_status: 'Success, this author has following book(s):',
                mutiple_books_array: action.payload
            };


        case 'SEARCH_BY_KEYWORDS':
            return {
                ...state,
                search_status: 'Success,following book(s) contain searched keywords in the title:',
                mutiple_books_array: action.payload
            };


        default:
            return state;



    }
}

