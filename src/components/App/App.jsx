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

    //On load, get items
    useEffect(() => {
        getItems();
    }, [])

    const getItems = () => {
        axios.get('/')
            .then(response => {
                console.log('RES!', response);
                //setItemListArray(response.params)
                //console.log('setItemArray',setItemListArray);
            })
            .catch(err => {
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
                />
                <ItemList
                    itemListArray={itemListArray}
                />
            </main>
        </div>
    );
}

export default App;
