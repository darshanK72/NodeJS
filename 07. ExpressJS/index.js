const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;
const database = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

function getProducts() {
    return database.products;
}

function getProductById(id) {
    return database.products.find(item => item.id == id);
}

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("Hello World");
})

app.get('/products', (req, res) => {
    let products = getProducts();
    if (!products) {
        return res.status(404).send("Products Not Found");
    }
    return res.status(200).json(products);
})

app.get('/products/:id', (req, res) => {
    let product = getProductById(req.params.id);
    console.log(req.params.id);
    if (!product) {
        return res.status(404).send("Product Not Found");
    }
    return res.status(200).json(product);
})

app.post('/products', (req, res) => {
    let products = getProducts();
    let newProduct = {
        id: products.length + 1,
        ...req.body
    }

    database.products.push(newProduct);

    fs.writeFile('./db.json', JSON.stringify(database), (error) => {
        if (error) {
            return res.status(500).send("Internal Server Error");
        }
        else {
            return res.status(201).json(newProduct);
        }
    })

})

app.listen(port, () => {
    console.log("Server is runnint at http://localhost:3000/");
})