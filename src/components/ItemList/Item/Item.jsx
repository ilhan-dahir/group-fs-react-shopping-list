import { useDebugValue } from "react";
import axios from "axios";

function Item(props) {

    function buy(itemId) {

        axios({
            method: 'PUT',
            url: `/items/${itemId}`
        }).then(response => { 
            props.getItems();
        }).catch(err => {
            alert('error getting items');
            console.log(err);
        })

    }

    return(
        <div>
            {props.itemListArray.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <h3>{item.quantity}</h3>
                    <h3>{item.unit}</h3>
                    <div>
                        <button onClick={() => {buy(item.id)}}>Buy</button>
                        <button>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    
    )
}

export default Item;