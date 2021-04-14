const M = 1000000;

const CLIENTS_AMOUNT = 0.1 * M;
const PIZZAS_AMOUNT = 50;
const ORDERS_AMOUNT = 250 * M;
const CHUNK_SIZE = 1 * M;

const ORDER_MIN_DATE = new Date(2010, 1, 1);
const ORDER_MAX_DATE = new Date();

const fs = require("fs");
const faker = require("faker");

function generateClients(amount) {
  const res = [];
  for (let i = 0; i < amount; i++) {
    const client = faker.internet.email();
    res.push(client);
    console.log("Client created: ", client);
  }

  return res;
}

function generatePizzas(amount) {
  const res = [];
  for (let i = 0; i < amount; i++) {
    const pizza = faker.lorem.slug(2);
    res.push(pizza);
    console.log("Pizza created: ", pizza);
  }

  return res;
}

function generateOrder(clients, pizzas) {
  return {
    client: faker.random.arrayElement(clients),
    pizza: faker.random.arrayElement(pizzas),
    orderDate: faker.date.between(ORDER_MIN_DATE, ORDER_MAX_DATE),
  };
}

const clients = generateClients(CLIENTS_AMOUNT);
const pizzas = generatePizzas(PIZZAS_AMOUNT);

function generateOrdersByChunks(amount, chunkSize) {
  fs.rmdirSync("./data", { recursive: true });
  fs.mkdirSync("./data");

  let chunk = [];
  let chunksCounter = 0;

  let lastPercentage;
  for (let i = 0; i < amount; i++) {
    const order = generateOrder(clients, pizzas);
    chunk.push(order);

    const percentage = Math.round((i * 100) / amount);
    if (percentage !== lastPercentage) {
      lastPercentage = percentage;
      console.log(percentage, "%");
    }

    if ((i + 1) % chunkSize === 0) {
      const json = JSON.stringify(chunk);
      chunk = [];
      chunksCounter++;
      fs.writeFileSync(`./data/${chunksCounter}.json`, json);
    }
  }
}

generateOrdersByChunks(ORDERS_AMOUNT, CHUNK_SIZE);
