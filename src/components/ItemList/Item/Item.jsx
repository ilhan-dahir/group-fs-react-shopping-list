
import axios from 'axios';
import './Item.css'

function Item(props) {

    const item = props.item

    const applyPurchasedCSS = () => {
        if (item.purchaseStatus) {
            return 'grey item-card'
        }
        else {
            return 'item-card bisque'
        }
    }

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

    const Buttons = (itemRendered) => {
        console.log(itemRendered.purchaseStatus);
        console.log(itemRendered.name);
        if (itemRendered.purchaseStatus === false) {
            // setIsPurchased(false);
            return (
                <div className='button-div'>
                    <button className='green' onClick={() => {buy(itemRendered.id)}}>Buy</button> 
                    <button className='red' onClick={() => {removeFromItemList(itemRendered.id)}}>Remove 🗑️</button>
                </div>
            )
        }
        else {
            // setIsPurchased(true);
            return <p>✅ Purchased ✅</p>
        }
    }

    return (
        <div className={applyPurchasedCSS()} key={item.id}>
            <h3>{item.name}</h3>
            <h3>{item.quantity} {item.unit}</h3>
            {Buttons(item)}
        </div>
    )
}

export default Item;