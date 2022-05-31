class Product {
  constructor(id, title, description, img, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.img = img;
    this.price = price;
  }
}

const product = new Product();

module.exports = { Product: product };
