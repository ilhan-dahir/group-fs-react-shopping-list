import axios from 'axios';
import Item from './Item/Item';

function ItemList(props) {

    
    return (
        <>
            <h1>Shopping List</h1>
            <div>
                {/* Reset button will set purchaseStatus of all items to FALSE - ELI */}
                <button>Reset</button>
                {/* Clear button, clear that table bby -  ILHAN*/}
                <button>Clear</button>
            </div>

            <Item itemListArray={props.itemListArray} getItems={props.getItems}/>
        </>
    );
}

export default ItemList;
