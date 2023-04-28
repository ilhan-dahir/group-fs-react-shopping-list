import { useState } from "react";
import axios from 'axios';
import './AddItem.css';

function AddItem(props) {

    const [newItemName, setNewItemName] = useState('')
    const [newItemQuantity, setNewItemQuantity] = useState('')
    const [newItemUnit, setNewItemUnit] = useState('')

    const handleItemsSubmit = (event) => {
        event.preventDefault();
        addItemToList();
    }

    const addItemToList = () => {
        axios.post('/items', { name: newItemName, quantity: newItemQuantity, unit: newItemUnit })
            .then(response => {
                // clear inputs
                setNewItemName('');
                setNewItemQuantity('');
                setNewItemUnit('');

                props.getItems();// setup getItems
            })
            .catch(err => {
                alert('Please fill the required feilds');
                console.log(err);
            })
    };

    return (
        <>
            <h1>Add an Item</h1>
            <form onSubmit={handleItemsSubmit}>
                <label>
                    Item
                </label>
                <input
                    placeholder="Required"
                    type="text"
                    className='item-input-box'
                    value={newItemName}
                    name="itemInput"
                    onChange={(evt) => setNewItemName(evt.target.value)}
                />
                <div>
                    <label>
                        Quantity
                    </label>
                    <input
                        placeholder="Required"
                        type="text"
                        className='quantity-input-box'
                        value={newItemQuantity}
                        name="quantityInput"
                        onChange={(evt) => setNewItemQuantity(evt.target.value)}
                    />
                    <label>
                        Unit
                    </label>
                    <input
                        placeholder="Required"
                        type="Unit"
                        className='input-box'
                        value={newItemUnit}
                        name="unitInput"
                        onChange={(evt) => setNewItemUnit(evt.target.value)}
                    />
                </div>
                <button className='submit-btn' type="submit">Save</button>
            </form>
        </>
    );
}

export default AddItem;