import axios from 'axios';
import './Item.css'
function Item(props) {

    const removeFromItemList = (idToDelete) => {
        axios({
            method: 'DELETE',
            url: `/items/${idToDelete}`
        }).then((response) => {
            props.getItems();
        }).catch((error) => {
            alert('unable to delete item at this time, please try again later.');
            console.log('Error:', error);
        })
    }

    return (
        <div class='item-card-container'>
            {props.itemListArray.map(item => (
                <div class='item-card' key={item.id}>
                    <h3>{item.name}</h3>
                    <h3>{item.quantity} {item.unit}</h3>
                    <div className='button-div'>
                        <button>Buy</button>
                        <button onClick={() => {removeFromItemList(item.id)}}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item;