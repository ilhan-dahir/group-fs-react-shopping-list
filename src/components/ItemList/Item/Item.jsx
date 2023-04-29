
import axios from 'axios';
import './Item.css'

function Item(props) {

    const newItemName = props.newItem.newItemName;
    const newItemQuantity = props.newItem.newItemQuantity;
    const newItemUnit = props.newItem.newItemUnit;
    const setNewItemName = props.newItem.setNewItemName;
    const setNewItemQuantity = props.newItem.setNewItemQuantity;
    const setNewItemUnit = props.newItem.setNewItemUnit;

    const editToggle = props.newItem.editToggle;
    const setEditToggle = props.newItem.setEditToggle;

    const editItemId = props.newItem.editItemId;
    const setEditItemId = props.newItem.setEditItemId;
    
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
        // console.log(itemRendered.purchaseStatus);
        // console.log(itemRendered.name);
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

    const editItem = (item) => {
        //Get the specifc item from the edit button pressed.
        //Display those values in the userinput fields.
        fillInInputs(item);
        //When the user clicks the save button. Instead of it adding a new item to the 
        //list, have it update the current selected one based on its id.
        setEditToggle(true);
        setEditItemId(item.id);
            //Maybe a conditional for the save button. TO know if its updating or adding 
            //in a new item.
            //PUT REQUEST
        //Reset user input fields.
    }

    function fillInInputs(item) {
        setNewItemName(item.name);
        setNewItemQuantity(item.quantity);
        setNewItemUnit(item.unit);
    }
 

    return (
        <div className={applyPurchasedCSS()} key={item.id}>
            <button onClick={() => {editItem(item)}}>Edit</button>
            <h3>{item.name}</h3>
            <h3>{item.quantity} {item.unit}</h3>
            {Buttons(item)}
        </div>
    )
}

export default Item;