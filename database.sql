--Name of database should be: 'shopping_list'

-- Don't forget to add your create table SQL 
CREATE TABLE shopping_cart (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "purchaseStatus" BOOLEAN DEFAULT FALSE
);

-- It is also helpful to include some test data
INSERT INTO shopping_cart ("name", "quantity", "unit")
VALUES ('banana', 1, 'bunch'), ('apple', 2, 'bags'), ('pears', 4, 'bags');

-- Selectors
SELECT * FROM shopping_cart ORDER BY name ASC