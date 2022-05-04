class Contenedor {
  productsArray = [];

  saveProduct(product) {
    this.productsArray.push(product);
  }
  getById(id) {
    const foundProduct = this.productsArray.find((prod) => prod.id === id);
    if (foundProduct !== undefined) {
      console.log(foundProduct);
      return foundProduct;
    } else {
      console.error("no se encontro un prod con ese id");
      return null;
    }
  }
  getAll() {
    console.log(this.productsArray);
    return this.productsArray;
  }
  deleteById(id) {
    let newProductsArray = [];
    for (let i = 0; i < this.productsArray.length; i++) {
      if (this.productsArray[i].id !== id) {
        newProductsArray = [...newProductsArray, this.productsArray[i]];
      }
    }
    console.log(newProductsArray);
    return newProductsArray;
  }
  deleteAll() {
    this.productsArray = [];
    console.log(this.productsArray);
  }
}

const producto1 = {
  id: 1,
  title: "Paleta de Pintor",
  price: 168,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-06-512.png",
};
const producto2 = {
  id: 2,
  title: "Microscopio",
  price: 1250,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-10-512.png",
};
const producto3 = {
  id: 3,
  title: "Lápiz HB",
  price: 15,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/pencil-512.png",
};
const producto4 = {
  id: 4,
  title: "Tijera",
  price: 40,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/closed-scissor-512.png",
};

const products = new Contenedor();

products.saveProduct(producto1);
products.saveProduct(producto2);
products.saveProduct(producto3);
products.saveProduct(producto4);

console.log(products.getById(5));

products.getById(2);

products.getAll();

products.deleteById(2);

products.deleteAll();
