//create schema
//connect to Mongo db and collection
//return model object such as orders,customers,sellers,products etc.


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

const customersObj = {
    "customerId":{ type:Number, required:true },
    "customerName": {type: String, required: true },
    "customerPassword": { type: String, required: true },
    "customerEmail": { type: String, required: true },
    "customerMobile": { type: Number },
    "cart": {
        type: [{
            "productId": { type: Number, required: true },
            "quantity": { type: Number, min: 1, required: true }
        }],
        default: []
    },
    "orders": {
        type: [{ "orderId": { type: Number, required: true } }],
        default: []
    },
    "uCurrency": { type : Number, default : 10 },
    "address":{
        type:{
            "doorNumber":{ type : String},
            "street":{ type : String, required:true},
            "city" : { type : String , required:true},
            "State":{type : String,required:true},
            "pincode":{ type : Number, required:true}
            },
        default : {}
    }
};

const productsObj = {
    "productId":{ type:Number, required:true },
    "productName": {type:String, required: true },
    "quantity": { type:Number, min:10, required: true },
    "price": { type:Number, required: true },
    "discount": { type:Number, default:0 },
    "highlights": {
        type: [{type:String}],
        default: []
    },
    "description": {
        type: [{type:String}],
        default: []
    },
    "rating": { type:Number, default:1, min:1, max:5 },
    "reviews": {
        type: [{
            "customerId":{ type:Number, required:true},
            "comment":{ type:String, required:true},
            "rating":{ type:Number, min:1, max:5, required:true },
            "reviewDate":{type:Date, required:true}
        }],
        default: []
    },
    "sellcount":{ type:Number, default:0 },
    "returnCount" : { type:Number, default:0 },
    "productImages" :{
        type:[{ type:String, required:true }],
        required : true
    },
    "sellerId" :{ type:Number, required:true },
    "sizes" :{
        type : [{type : String, required:true}],
        default :[]
    },
    "colors" :{
        type : [{type : String, required:true}],
        default :[]
    }
};

const ordersObj = {
    "orderId":{ type:Number, required:true },
    "customerId":{trpe : Number, required : true},
    "products": {
        type: [{
            "productId": { type: Number, required: true },
            "quantity": { type: Number, min: 1, required: true }
        }],
        default: []
    },
    "status": { type : String, required: true},
    "deliveryAddress":{
        type:{
            "doorNumber":{ type : String},
            "street":{ type : String, required:true},
            "city" : { type : String , required:true},
            "State":{type : String,required:true},
            "pincode":{ type : Number, required:true}
            },
        default : {}
    },
    "orderDate":{ type: Date, required :true },
    "deliveredDate":{ type: Date }
};

const sellersObj = {
    "sellerId":{ type:Number, required:true },
    "companyName": {type: String, required: true },
    "sellerPassword": { type: String, required: true },
    "sellerEmail": { type: String, required: true },
    "sellerMobile": { type: Number },
    "products": {
        type: [{ "productId": { type: Number, required: true } }],
        default: []
    },
    "address":{
        type:{
            "doorNumber":{ type : String},
            "street":{ type : String, required:true},
            "city" : { type : String , required:true},
            "State":{type : String,required:true},
            "pincode":{ type : Number, required:true}
            },
        default : {}
    }
};

const connection = {};
const customersSchema = new Schema(customersObj, { collection: "Customers", timestamps: true });
const productsSchema = new Schema(productsObj, { collection: "Products", timestamps: true });
const ordersSchema = new Schema(ordersObj, { collection: "Orders", timestamps: true });
const sellersSchema = new Schema(sellersObj, { collection: "Sellers", timestamps: true });

connection.getCollection = collectionName => {
    return mongoose.connect("mongodb://localhost:27017/UkartShoppingDB", { useNewUrlParser: true }).then((db) => {
        switch (collectionName){
            case "Customers" :  return db.model(collectionName, customersSchema);
            case "Products" :  return db.model(collectionName, productsSchema);
            case "Orders" :  return db.model(collectionName, ordersSchema);
            case "Sellers" :  return db.model(collectionName, sellersSchema);
        }
    }).catch((err) => {
        console.log(err.message);
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    });
}

module.exports = connection