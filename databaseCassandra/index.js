const ExpressCassandra = require(`express-cassandra`);

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "mykeyspace",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

const product = models.loadSchema("Product", {
  fields: {
    id: "int",
    name: "text",
    rating: "int",
    reviewCount: "int",
    itemNum: "int",
    price: "int",
    mainImage: "text",
    images: "[]"
  },
  key: ["id"]
});

console.log(models.instance.Product === product);

product.syncDB((err, result) => {
  if (err) throw err;
  console.log("schema has changed", result);
});

const example = new models.instance.Product({
  id: 1,
  name: "James",
  rating: 5,
  reviewCount: 5,
  itemNum: 23453,
  price: 4.5,
  mainImage: "test",
  images: [4, 5, 6]
});

example.save(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("It works");
});
