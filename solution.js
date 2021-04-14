const fs = require("fs");

const minYear = 2010;
const maxYear = 2021;
const filesAmount = 250;

function main(minYear, maxYear, filesAmount) {
  const dateResult = new Map();
  const pizzasMap = new Map();
  const clientsMap = new Map();

  for (let i = minYear; i <= maxYear; i++) {
    for (let j = 1; j <= 12; j++) {
      dateResult.set(`${j}.${i}`, 0);
    }
  }

  for (let i = 1; i <= filesAmount; i++) {
    const fileContent = fs.readFileSync(`data/${i}.json`, "utf8");
    const parsedFile = JSON.parse(fileContent);

    console.log(`Processing file №${i}, progress ${(i - 1) / filesAmount * 100}%`);

    for (let j = 0; j < parsedFile.length; j++) {
      const date = new Date(parsedFile[j].orderDate);
      const dateKey = (date.getMonth() + 1) + `.` + date.getFullYear();
      dateResult.set(dateKey, dateResult.get(dateKey) + 1);

      const client = parsedFile[j].client;
      if (clientsMap.has(client)) {
        clientsMap.set(client, clientsMap.get(client) + 1);
      } else {
        clientsMap.set(client, 0);
      }

      const pizza = parsedFile[j].pizza;
      if (pizzasMap.has(pizza)) {
        pizzasMap.set(pizza, pizzasMap.get(pizza) + 1);
      } else {
        pizzasMap.set(pizza, 0);
      }
    }
  }

  const orderClientMap = [...new Set(clientsMap)];
  const orderPizzaMap = [...new Set(pizzasMap)];

  orderClientMap.sort((a, b) => b[1] - a[1]);
  orderPizzaMap.sort((a, b) => b[1] - a[1]);

  const pizzaResult = orderPizzaMap.slice(0, 3);
  const clientResult = orderClientMap.slice(0, 5);

  const result = {
    chartData: dateResult,
    clientsTop: clientResult,
    pizzaTop: pizzaResult,
  };

  console.log(`Processing finished, progress 100%`);

  return result;
}

console.log(main(minYear, maxYear, filesAmount));
