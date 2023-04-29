import axios from 'axios';
import Item from './Item/Item';
import './ItemList.css';
import Swal from 'sweetalert2';

function ItemList(props) {

    function handleReset() {
        // Confirmation box before Resetting
        Swal.fire({
            icon: 'warning',
            title: 'Reset Confirmation',
            text: 'Are you sure you want to reset the purchase status of All items?',
            showCancelButton: true,
            confirmButtonText: 'Yes, I want to reset.',
            cancelButtonText: 'No, I want to cancel!',
            reverseButtons: true
        }).then((result) => {
            if(result.isConfirmed) {
                //If confirmed, complete the reset with PUT request
                axios({
                    method: 'PUT',
                    url: '/items/'
                }).then((response) => {
                    // If axios request succesful, alert the user
                    Swal.fire({
                        icon: 'success',
                        title: 'Reset Complete',
                        text: 'Your list has been reset!'
                    })
                    // Then rerun getItems
                    props.getItems();
                }).catch((error) => {
                    // If axios request failed, alert the user
                    Swal.fire({
                        icon: 'warning',
                        text: 'An error occured with the reset, please try again later.'
                    })
                    console.log('The Reset failed miserably');
                })
            }
            else if (result.dismiss === Swal.DismissReason.cancel){
                // If cancelled, alert the user that their list was not reset
                Swal.fire({
                    icon: 'error',
                    title: 'Phew!',
                    text: 'That was close, your list has NOT been reset'
                })
            }
        })
    }

    function handleDelete() {
        Swal.fire({
            icon: 'warning',
            title: 'Delete Confirmation',
            text: 'Are you sure you want to remove all the items from your list?',
            showCancelButton: true,
            confirmButtonText: 'Yes, I want to erase everything and start over.',
            cancelButtonText: 'No, I want to cancel!',
            reverseButtons: true
        }).then((result) => {
            if(result.isConfirmed) {
                //If confirmed, complete the reset with PUT request
                axios({
                    method: 'Delete',
                    url: '/items/'
                }).then((response) => {
                    // If axios request succesful, alert the user
                    Swal.fire({
                        icon: 'success',
                        title: 'Clear Complete',
                        text: 'All items have been deleted!'
                    })
                    // Then rerun getItems
                    props.getItems();
                }).catch((error) => {
                    // If axios request failed, alert the user
                    Swal.fire({
                        icon: 'warning',
                        text: 'An error occured while deleting the list, please try again later.'
                    })
                    console.log('The Delete failed');
                })
            }
            else if (result.dismiss === Swal.DismissReason.cancel){
                // If cancelled, alert the user that their list was not reset
                Swal.fire({
                    icon: 'error',
                    title: 'Phew!',
                    text: 'That was close, your list has NOT been deleted'
                })
            }
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

            <div className='item-card-container'>
              {
                  props.itemListArray.map((item) => {
                      return (
                          <Item 
                              key={item.id}    
                              item={item}
                              getItems={props.getItems}
                              itemListArray={props.itemListArray}
                              newItem={props.newItem}
                          />
                      )
                  })
              }
            </div>
        </>
    );
}

export default ItemList;
