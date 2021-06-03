export const initialState = {
    basket:[
        // {
        //     id:'12345670', 
        //     title:'GRITSTONES Men\'s Regular Fit Shirt',
        //     price:383.00,
        //     ratings:3,
        //     image :'https://images-na.ssl-images-amazon.com/images/I/71tHEf94tqL._UL1440_.jpg'
        // }
    ],
    user: null
}

export const reducer = (state,action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            console.log(Array.from(new Set(state.basket)))
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'REDUCE_FROM_BASKET':
            let newBasket;
            for(let i=0; i<state.basket.length;i++){
                if(state.basket[i].id===action.id){
                    newBasket=[...state.basket]
                    newBasket.splice(i,1);
                    console.log(newBasket)
                    break;
                }
            } 
            return {
                ...state,
                basket: newBasket
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id)
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}