import axios from 'axios';

function ItemList(props) {

    console.log(props.itemList);
    return (
        <>
            <h1>Shopping List</h1>
            <div>
                <button>Reset</button>
                <button>Clear</button>
            </div>

            <div>
                {props.itemListArray.map(item => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <h3>{item.quantity}</h3>
                        <h3>{item.unit}</h3>
                        <div>
                            <button>Buy</button>
                            <button>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ItemList;
