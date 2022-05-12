const fs = require("fs");
const path = "./productos.txt";

const producto1 = {
  title: "Paleta de Pintor",
  price: 168,
  thumbnail:
    "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-06-512.png",
};
// const producto2 = {
//   id: 2,
//   title: "Microscopio",
//   price: 1250,
//   thumbnail:
//     "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-10-512.png",
// };
// const producto3 = {
//   id: 3,
//   title: "Lápiz HB",
//   price: 15,
//   thumbnail:
//     "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/pencil-512.png",
// };
// const producto4 = {
//   id: 4,
//   title: "Tijera",
//   price: 40,
//   thumbnail:
//     "https://cdn4.iconfinder.com/data/icons/to-cool-for-school/512/closed-scissor-512.png",
// };

class ContenedorArchivo {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    if (fs.existsSync(path)) {
      try {
        const data = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al leer archivo");
      }
    } else {
      try {
        await fs.promises.writeFile(path, JSON.stringify([], null, 2));
        const data = await fs.promises.readFile(path, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw new Error("Error al escribir el archivo");
      }
    }
  }

  async getAllFile() {
    try {
      const data = await this.readFile();
      return data;
    } catch (error) {
      throw new Error("Error al leer el archivo");
    }
  }
  async updateFile(product) {
    try {
      const readContent = await this.readFile();
      readContent.push(product);
      await fs.promises.writeFile(path, JSON.stringify(readContent, null, 2));
    } catch (error) {
      throw new Error("Error al escribir archivo");
    }
  }
  async saveInFile(product) {
    product.id = `${Date.now()}`;
    try {
      const readContent = await this.readFile();
      readContent.push(product);
      await fs.promises.writeFile(path, JSON.stringify(readContent, null, 2));
    } catch (error) {
      throw new Error("Error al escribir archivo");
    }
  }

  async deleteAllFile() {
    try {
      await fs.promises.writeFile(path, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error al escribir archivo");
    }
  }

  async getById(id) {
    let productsArray = await this.readFile();
    const foundProduct = productsArray.find((prod) => prod.id === id);
    if (foundProduct !== undefined) {
      return foundProduct;
    } else {
      return null;
    }
  }

  async deleteById(id) {
    let productsArray = await this.readFile();
    let newProductsArray = [];
    newProductsArray = productsArray.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      path,
      JSON.stringify(newProductsArray, null, 2)
    );
  }
}

const contenedor = new ContenedorArchivo(path);

module.exports = {
  Contenedor: contenedor,
};
