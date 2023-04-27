import './Item.css'

function Item(props) {

    return(
        <div class='item-card-container'>
            {props.itemListArray.map(item => (
                <div class='item-card' key={item.id}>
                    <h3>{item.name}</h3>
                    <span><h3>{item.quantity} {item.unit}</h3></span>
                    <div class='button-div'>
                        <button>Buy</button>
                        <button>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    
    )
}

export default Item;