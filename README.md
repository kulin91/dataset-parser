# Create algorithm for parsing dataset

## Project setup

#### 1. npm install
#### 2. node generate.js
#### 3. node solution.js

## Task description

#### Dataset includes data about client, pizza and orderDate
`
  [
    {
      client: 'clientName',
      pizza: 'pizzaName',
      orderDate: '2016-10-16T06:38:55.681Z'
    },
    ...
  ]
`

#### Output should be an object with next fields: chartData, clientsTop, pizzaTop. Where
- chartData => From 2010 to 2021: { mm.yyyy: amountOfOrdersByMonth}
- clientsTop => Top 5 clients: [[clientName, amountOfOrders]]
- pizzaTop => Top 3 pizzas: [[pizzaName, amountOfOrders]]
