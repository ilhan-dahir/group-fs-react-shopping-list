import { useState } from "react";
import axios from 'axios';
import './AddItem.css';
import Swal from "sweetalert2";

function AddItem(props) {

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

    const [requiredName, setRequiredName] = useState(false);
    const [requiredQuantity, setRequiredQuantity] = useState(false);
    const [requiredUnit, setRequiredUnit] = useState(false);

    const handleItemsSubmit = (event) => {
        event.preventDefault();
        addItemToList();
    }

    const addItemToList = () => {
        if (newItemName !== '' &&  newItemQuantity !== '' && newItemUnit !== '') {
            axios.post('/items', { name: newItemName, quantity: newItemQuantity, unit: newItemUnit })
            .then(response => {
                // clear inputs
                setNewItemName('');
                setNewItemQuantity('');
                setNewItemUnit('');
                setRequiredName(false);
                setRequiredQuantity(false);
                setRequiredUnit(false);

                props.getItems();// setup getItems
            })
            .catch(err => {
                alert('Please fill the required fields');
                console.log(err);
            })
        }
        else {
            Swal.fire({
                text: 'Please fill out the required fields'
            })
            if (newItemName === '') {
                setRequiredName(true)
            }
            if (newItemQuantity === '') {
                setRequiredQuantity(true)
            }
            if (newItemUnit === '') {
                setRequiredUnit(true)
            }
        }

    };

    //Update Item PUT request:
    function updateItemInfo() {
        //Reset Toggle;
        setEditToggle(false);

        axios({
            method: 'PUT',
            url: `/items/item/${editItemId}`,
            data: {
                newItemName,
                newItemQuantity,
                newItemUnit
            }
        }).then(response => { 
            props.getItems();
        }).catch(err => {
            alert('error getting items');
            console.log(err);
        })
    }

    //Conditionally render save button:
    const saveButton = () => {
        // console.log(itemRendered.purchaseStatus);
        // console.log(itemRendered.name);
        if (editToggle === false) {
            return (
                <button className='submit-btn' onClick={handleItemsSubmit}>Save</button>  
            )
        }
        else {
            return (
                <button type="reset" onClick={() => {updateItemInfo()}}>Save Edit</button>
            )
        }
    }

    const requiredNameField = () => {
        if (requiredName) {
            return 'item-input-box red-background'
        }
        else {
            return 'item-input-box'
        }
    }

    const requiredQuantityField = () => {
        if (requiredQuantity){
            return 'quantity-input-box red-background'
        }
        else {
            return 'quantity-input-box'
        }
    }

    const requiredUnitField = () => {
        if (requiredUnit){
            return 'input-box red-background'
        }
        else {
            return 'input-box'
        }
    }

    // const place

    return (
        <>
            <h1>Add an Item</h1>
            <form>
                <label>
                    Item
                </label>
                <input
                    placeholder="Required"
                    type="text"
                    className={requiredNameField()}
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
                        type="number"
                        className={requiredQuantityField()}
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
                        className={requiredUnitField()}
                        value={newItemUnit}
                        name="unitInput"
                        onChange={(evt) => setNewItemUnit(evt.target.value)}
                    />
                </div>
                {saveButton()}
            </form>
        </>
    );
}

export default AddItem;