import axios from 'axios';
import Item from './Item/Item';
import './ItemList.css';
import Swal from 'sweetalert2';

function ItemList(props) {
    function handleReset() {
        Swal.fire({
            icon: 'warning',
            title: 'Reset Confirmation',
            text: 'Are you sure you want to reset the purchase status of All items?',
            showCancelButton: true,
            confirmButtonText: 'Yes, I want to reset.',
            cancelButtonText: 'No, I want to cancel!',
            // reverseButtons: true
        }).then((result) => {
            if(result.isConfirmed) {
                axios({
                    method: 'PUT',
                    url: '/items/'
                }).then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reset Complete',
                        text: 'Your list has been reset!'
                    })
                    props.getItems();
                }).catch((error) => {
                    console.log('The Reset failed miserably');
                })
            }
            else if (result.dismiss === Swal.DismissReason.cancel){
                Swal.fire({
                    icon: 'error',
                    title: 'Phew!',
                    text: 'That was close, your list has NOT been reset'
                })
            }
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
            <h1 className='list-title'>Shopping List</h1>
            <div>
                {/* Reset button will set purchaseStatus of all items to FALSE - ELI */}
                <button className='reset-btn' onClick={handleReset}>Reset</button>
                {/* Clear button, clear that table bby -  ILHAN*/}
                <button className='clear-btn' onClick={handleDelete}>Clear</button>
            </div>

            <Item itemListArray={props.itemListArray} getItems={props.getItems} />
        </>
    );
}

export default ItemList;
