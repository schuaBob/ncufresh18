var mongoose=require('mongoose');

var document= mongoose.Schema({
    id:{
        type:String,
        unique:true
    },//不同的表單
    title:String,
    content:String,
    href:String//放連結的

})
