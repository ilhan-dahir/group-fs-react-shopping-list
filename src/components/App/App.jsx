import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Header from '../Header/Header.jsx';
import AddItem from '../AddItem/AddItem';
import ItemList from '../ItemList/ItemList';

function App() {
    const [itemListArray, setItemListArray] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
    const [newItemUnit, setNewItemUnit] = useState('') ;
    const [editToggle, setEditToggle] = useState(false) ;
    const [editItemId, setEditItemId] = useState(0) ;

    const newItem = {
        newItemName,
        newItemQuantity,
        newItemUnit,
        setNewItemName,
        setNewItemQuantity,
        setNewItemUnit,
        editToggle,
        setEditToggle,
        editItemId,
        setEditItemId
    };

    //On load, get items
    useEffect(() => {
        getItems();
    }, [])

    const getItems = () => {
        axios({
            method: 'GET',
            url: '/items'
        }).then(response => { 
            setItemListArray(response.data)
            //console.log('setItemArray',setItemListArray);
        }).catch(err => {
            alert('error getting items');
            console.log(err);
        })
    }

    return (
        <div className="App">
            <Header />
            <main>
                {/* <p>Under Construction...</p> */}
                < AddItem
                    getItems={getItems}
                    newItem={newItem}
                />
                <ItemList
                    itemListArray={itemListArray}
                    getItems={getItems}
                    newItem={newItem}
                />
            </main>
        </div>
    );
}

export default App;
