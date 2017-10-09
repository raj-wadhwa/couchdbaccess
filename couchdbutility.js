
const NodeCouchDB= require('node-couchdb');
const couchdb=new NodeCouchDB({
    host: 'localhost',
    protocol: 'http',
    port: '5984',
    auth: {
        user: 'admin',
        pass: 'test1234'
    }
});

var couchdb_utils= {
    
    listDatabases: function(){
        couchdb.listDatabases().then(dbs => {
            //dbs.map(([key,value]) => {console.log(key + ' '+value)});
            dbs.forEach(function(element) {
                console.log(element);
            }, this);
        }, 
        err=>{
            console.log('Error was thrown');
        });
    },

    fetchRowByID: function (db,docid){
        couchdb.get(db, docid).then(({data, headers, status}) => {
            console.log('Document of Baseball DB');
            console.log(data.prices);
            // data is json response
            // headers is an object with all response headers
            // status is statusCode number
        }, err => {
            // either request error occured
            // ...or err.code=EDOCMISSING if document is missing
            // ...or err.code=EUNKNOWN if statusCode is unexpected
        });
    },

    fetchDocsByView: function(dbName, viewUrl, startKey,endKey){
        const queryOptions = {
            startKey,
            endKey
        };

        couchdb.get(dbName, viewUrl, queryOptions).then(({data, headers, status}) => {
            console.log("CouchDB View Data");
            //console.log(data.rows);
            data.rows.forEach(function(element) {
                console.log(element.key +':'+ element.value)
            }, this);
            // data is json response 
            // headers is an object with all response headers 
            // status is statusCode number
        }, err => {
            console.log("Request Failed:"+ err);
            console.log("Request Failed: Error Code:"+err.code);
            // either request error occured 
            // ...or err.code=EDOCMISSING if document is missing 
            // ...or err.code=EUNKNOWN if statusCode is unexpected 
        });
    }

}

    // const dbName = "baseball";
    // const startKey = ["Ann"];
    // const endKey = ["George"];
    // const viewUrl = "_design/fruitDocsByPrices/_view/prices";

module.exports = couchdb_utils;