import axios from 'axios';
import Item from './Item/Item';
import './ItemList.css'

function ItemList(props) {
    function handleReset() {
        axios({
            method: 'PUT',
            url: '/items/'
        }).then((response) => {
            console.log('The items have all been reset');
        }).catch((error) => {
            console.log('The Reset failed miserably');
        })
    }
    function handleDelete() {
        axios({
            method: 'Delete',
            url: '/items/'
        }).then((response) => {
            console.log('All items are deleted');
            props.getItems();
        }).catch((error) => {
            console.log("Delete failed ");
        })
    }

    return (
        <>
            <h1 class='list-title'>Shopping List</h1>
            <div>
                {/* Reset button will set purchaseStatus of all items to FALSE - ELI */}
                <button class='reset-btn' onClick={handleReset}>Reset</button>
                {/* Clear button, clear that table bby -  ILHAN*/}
                <button class='clear-btn' onClick={handleDelete}>Clear</button>
            </div>

            <Item itemListArray={props.itemListArray} getItems={props.getItems} />
        </>
    );
}

export default ItemList;
