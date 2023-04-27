import axios from 'axios';

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
        <div>
            {props.itemListArray.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <h3>{item.quantity}</h3>
                    <h3>{item.unit}</h3>
                    <div>
                        <button>Buy</button>
                        <button onClick={() => {removeFromItemList(item.id)}}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item;