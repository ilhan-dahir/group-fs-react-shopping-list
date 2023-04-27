import axios from 'axios';
import Item from './Item/Item';
import './ItemList.css';

function ItemList(props) {

    
    return (
        <>
            <h1 class='list-title'>Shopping List</h1>
            <div>
                {/* Reset button will set purchaseStatus of all items to FALSE - ELI */}
                <button class='reset-btn'>Reset</button>
                {/* Clear button, clear that table bby -  ILHAN*/}
                <button class='clear-btn'>Clear</button>
            </div>

            <Item itemListArray={props.itemListArray} getItem={props.getItem}/>
        </>
    );
}

export default ItemList;
