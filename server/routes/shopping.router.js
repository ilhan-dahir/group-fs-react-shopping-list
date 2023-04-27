const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Setup a GET route to get all the guest from the database
router.get('/', (req, res) => {
    // When you fetch all things in these GET routes, strongly encourage ORDER BY
    // so that things always come back in a consistent order 
    const sqlText = `SELECT * FROM shopping_cart ORDER BY name ASC;`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

// Setup a POST route to add a new guest to the database
router.post('/', (req, res) => {
    const item = req.body;
    const sqlText = `
        INSERT INTO shopping_cart
            ("name", "quantity", "unit")
            VALUES ($1, $2, $3);
    `;
    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, [item.name, item.quantity, item.unit])
        .then((result) => {
            console.log(`Added item to the database`, item);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


router.put('/:id', (req, res) => {

    const updateId = req.params.id

    const sqlText = `
        UPDATE  shopping_cart 
            SET "purchaseStatus" = TRUE
            WHERE "id" = $1;
    `;

    // Let sql sanitize your inputs (NO Bobby Drop Tables here!)
    // the $1, $2, etc get substituted with the values from the array below
    pool.query(sqlText, [updateId])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error updating database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


router.delete('/:id', (req, res) => {
    let id = req.params.id;

    const sqlText = `
        DELETE FROM "shopping_cart"
            WHERE "id"=$1;
    `;

    pool.query(sqlText, [id])
        .then((result) => {
            console.log('Deleted');
            // Send "Okay" status if the pool.query was sucessful
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Error making DELETE request to database', error);
            res.sendStatus(500);
        })
})

router.put('/', (req, res) => {
    let sqlText = `
    UPDATE "shopping_cart"
    SET "purchaseStatus" = 'FALSE';
    `

    pool.query(sqlText)
    .then((response) => {
        console.log('Successfully Reset');
        res.send(203);
    }).catch((error) => {
        console.log('Database side of reset failed');
        res.send(500);
    })

})
//Setup a delete route

router.delete('/', (req, res) => {
    console.log('DELETE RES >>>', req);
    let sqlText = `
    DELETE FROM shopping_cart;
    `;
    pool.query(sqlText)
        .then((response) => {
            console.log('Items Deleted');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('items /delete failed ', error);
            res.sendStatus(500);
        })

})

module.exports = router;