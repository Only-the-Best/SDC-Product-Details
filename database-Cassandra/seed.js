// const fs = require(`fs`);
const fs = require("graceful-fs");

const ExpressCassandra = require(`express-cassandra`);
const cassandra = require(`cassandra-driver`);
const Product = require(`./index.js`);
const stringify = require(`csv-stringify`);
const faker = require(`faker`);

// const example = new Product({
//   id: 1,
//   name: "James",
//   rating: 5,
//   reviewCount: 5,
//   itemNum: 23453,
//   price: 4.5,
//   mainImage: "test",
//   images: "image"
// });

// const example = [];

// example.push(
//   {
//     id: 1,
//     name: "James",
//     rating: 5,
//     reviewCount: 5,
//     itemNum: 23453,
//     price: 4.5,
//     mainImage: "test",
//     images: "image"
//   }
// );

// const writeToFile = function() {
//   for(var i = 0; i < 1000; i++){
//     stringify( example, (err, output) =>{
//       if (err) console.log(err)
//       fs.appendFile(`test.csv`, output, err => {
//         if (err) throw err
//       });
//     });
//   }
// }

// const startFile = function(num) {
//   console.time('start');
//   while(num > 0) {
//     writeToFile();
//     num--;
//   }
//   console.timeEnd('start');
// }
// startFile(1);

// stringify( example, (err, output) =>{
//   if (err) console.log(err)
//   fs.writeFile(`test.csv`, output, err => {
//     if (err) throw err
//     console.log("This file has been saved!");
//   });
// });

// const capitalizeFirst = str => {
//   let capitalized = str[0].toUpperCase();
//   for (let i = 1; i < str.length; i++) {
//     if (str[i - 1] === " ") {
//       capitalized += str[i].toUpperCase();
//     } else {
//       capitalized += str[i];
//     }
//   }
//   return capitalized;
// };

const randomNum = () => Math.floor(Math.random() * Math.floor(100));

// const populateImages = index => {
const images = [
  {
    image: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${50000}-min.jpg`,
    color: faker.commerce.color()
  }
];
let numOfImages;

// for (let i = 4; i > 0; i -= 1) {
//   if (50000 % i === 0) {
//     numOfImages = i - 1;
//     break;
//   }
// }
for (let i = 1; i <= 4; ++i) {
  images.push({
    image: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${randomNum()}-min.jpg`,
    color: faker.commerce.color()
  });
}
// return images;
// };

// const createMockProducts = num => {
  const products = [];
  // for (let i = 1; i <= 1; i++) {
for (let i = 0; i < 1000000; ++i) {
  products.push({
    _id: i,
    name: faker.commerce.productName(),
    rating: Number(faker.finance.amount(1, 5, 1)),
    reviewCount: faker.random.number({ min: 20, max: 150 }),
    itemNum: i,
    price: faker.commerce.price(50, 500),
    mainImage: `https://s3-us-west-1.amazonaws.com/hrr34-trailblazer/${i}-min.jpg`,
    images
  });
}
  // }
  // return products;
// };

// const writeToFile = function() {
  // for (let i = 0; i < 100000; ++i) {
    stringify(products, (err, output) => {
      fs.appendFile(`test.csv`, output, err => {
        if (err) throw err;
      });
    });
  // }
// };

// writeToFile();