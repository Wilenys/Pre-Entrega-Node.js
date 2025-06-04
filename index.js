// Destructuring de argumentos desde la línea de comandos
const [, , method, resourcePath, ...args] = process.argv;
const baseUrl = 'https://fakestoreapi.com​';

// Separar el recurso y el ID (si lo hay)
const [resource, id] = resourcePath?.split("/") ?? [];

// Función para consultar todos los productos
const getProducts = async () => {
  const response = await fetch(`${baseUrl}/products`);
  const products = await response.json();
  console.log(products);
};

// Función para consultar producto por ID
const getProductById = async (productId) => {
  const response = await fetch(`${baseUrl}/products/${productId}`);
  const product = await response.json();
  console.log(product);
};

// Función para crear producto
const createProduct = async (title, price, category) => {
  const newProduct = {
    title,
    price: parseFloat(price),
    category,
    description: 'Descripción de ejemplo',
    image: 'https://i.pravatar.cc/150?img=3'
  };

  const response = await fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });

  const result = await response.json();
  console.log(result);
};

// Función para eliminar producto
const deleteProduct = async (productId) => {
  const response = await fetch(`${baseUrl}/products/${productId}`, {
    method: 'DELETE'
  });
  const result = await response.json();
  console.log(result);
};

// Controlador principal
const main = async () => {
  if (!method || !resource) {
    console.log("  Uso incorrecto. Ejemplos:\n - npm run start GET products\n - npm run start GET products/5");
    return;
  }

  switch (method.toUpperCase()) {
    case 'GET':
      if (id) {
        await getProductById(id);
      } else {
        await getProducts();
      }
      break;

    case 'POST':
      if (args.length < 3) {
        console.log("⚠️  Faltan argumentos: título, precio y categoría.");
        return;
      }
      await createProduct(args[0], args[1], args[2]);
      break;

    case 'DELETE':
      if (!id) {
        console.log(" Debes especificar un ID para eliminar.");
        return;
      }
      await deleteProduct(id);
      break;

    default:
      console.log(" Método no soportado. Usa GET, POST o DELETE.");
  }
};

main();

