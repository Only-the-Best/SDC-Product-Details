const ExpressCassandra = require(`express-cassandra`);
const cassandra = require(`cassandra-driver`);
const fs = require(`fs`);

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

const Product = models.loadSchema("Product", {
  fields: {
    id: "int",
    name: "text",
    rating: "int",
    reviewCount: "int",
    itemNum: "int",
    price: "float",
    mainImage: "text",
    images: "text"
  },
  key: ["id"]
});

Product.syncDB((err, result) => {
  if (err) console.log(err);
  console.log("schema has changed", result);
});

module.exports = Product;
