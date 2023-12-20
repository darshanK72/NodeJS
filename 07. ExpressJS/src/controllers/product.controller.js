const fs = require('fs');

const database = JSON.parse(fs.readFileSync('./data/db.json', 'utf-8'));

function getProducts() {
    return database.products;
}

function getProductById(id) {
    return database.products.find(item => item.id == id);
}

function updateDatabase(database) {
    fs.writeFile('./data/db.json', JSON.stringify(database), (error) => {
        if (error) {
            throw error;
        }
    })
}

const getAllProducts = (req, res) => {
    let products = getProducts();
    if (!products) {
        return res.status(404).send("Products Not Found");
    }
    return res.status(200).json(products);
}

const getProduct = (req, res) => {
    let product = getProductById(req.params.id);
    if (!product) {
        return res.status(404).send("Product Not Found");
    }
    return res.status(200).json(product);
}

const addProduct = (req, res) => {
    let products = getProducts();
    let newProduct = {
        id: products.length + 1,
        ...req.body
    }
    database.products.push(newProduct);

    try {
        updateDatabase(database)
        return res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

}

const updateProduct = (req, res) => {
    let products = getProducts();
    let product = getProductById(req.params.id);
    if (!product) {
        return res.status(404).send("Not Found")
    }
    let indexOfProduct = products.indexOf(product);
    product = { ...product, ...req.body };
    products[indexOfProduct] = product;
    database.products = products;
    console.log(database);
    try {
        updateDatabase(database)
        return res.status(201).json(product);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const patchProduct = (req, res) => {
    let products = getProducts();
    let product = getProductById(req.params.id);
    if (!product) {
        return res.status(404).send("Not Found")
    }
    let indexOfProduct = products.indexOf(product);
    product = { ...product, ...req.body };
    products[indexOfProduct] = product;
    database.products = products;
    try {
        updateDatabase(database)
        return res.status(201).json(product);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

const deleteProduct = (req, res) => {
    let products = getProducts();
    let product = getProductById(req.params.id);
    if (!product) {
        return res.status(404).send("Not Found")
    }
    database.products = products.filter((product) => product.id != req.params.id);
    try {
        updateDatabase(database)
        return res.status(200).json(product);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}