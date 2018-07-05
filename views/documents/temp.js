// database config
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ncufresh18');

var document = require('../../models/document/document');

var QQQQQQ = Array();


for(let i = 0;i<1;i++){
    var QQ = new document({
        title:"",
        content:""
    }).save();
    QQQQQQ.push(QQ);
}

Promise.all(QQQQQQ).then(function(){
    mongoose.connection.close();
    process.exit();
}).catch(function(err){
    console.log(err);
})
