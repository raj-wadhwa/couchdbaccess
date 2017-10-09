const couchdb_utils=require('./couchdbutility.js');

const dbName = "baseball";
const startKey = ["Ann"];
const endKey = ["George"];
const viewUrl = "_design/fruitDocsByPrices/_view/prices";

couchdb_utils.listDatabases();
couchdb_utils.fetchDocsByView(dbName,viewUrl,startKey,endKey);
