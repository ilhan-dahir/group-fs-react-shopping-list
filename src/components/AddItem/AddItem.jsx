import { useState } from "react";
import axios from 'axios';

function AddItem(props) {

    const [newItemName, setNewItemName] = useState('')
    const [newItemQuantity, setNewItemQuantity] = useState('')
    const [newItemUnit, setNewItemUnit] = useState('')

    const handleItemsSubmit = (event) => {
        event.preventDefault();
        addItemToList();
    }

    const addItemToList = () => {
        axios.post('/', { name: newItemName, quantity: newItemQuantity, unit: newItemUnit })
            .then(response => {
                // clear inputs
                setNewItemName('');
                setNewItemQuantity('');
                setNewItemUnit('');

                // props.getItem();// setup getItems
            })
            .catch(err => {
                alert('Error Adding Items');
                console.log(err);
            })
    };

    return (
        <>
            <h1>Add an Item</h1>
            <form onSubmit={handleItemsSubmit}>
                <lable>
                    Item
                </lable>
                <input
                    type="text"
                    value={newItemName}
                    name="itemInput"
                    onChange={(evt) => setNewItemName(evt.target.value)}
                />
                <div>
                    <lable>
                        Quantity
                    </lable>
                    <input
                        type="text"
                        value={newItemQuantity}
                        name="quantityInput"
                        onChange={(evt) => setNewItemQuantity(evt.target.value)}
                    />
                    <lable>
                        Unit
                    </lable>
                    <input
                        type="Unit"
                        value={newItemUnit}
                        name="unitInput"
                        onChange={(evt) => setNewItemUnit(evt.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </>
    );
}

export default AddItem;