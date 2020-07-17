const express=require('express');


const Productdata=require('./src/model/Productdata');
const userdata=require('./src/model/Registerdata');


const cors=require('cors');

var bodyparser=require('body-parser');
const productdata = require('./src/model/Productdata');

var app=new express();

app.use(cors());

app.use(bodyparser.json());

app.get('/products',function(req,res){

res.header('Access-Control-Allow-Origin',"*");
res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");

Productdata.find()
.then(function(products){
    // console.log(products);
    res.send(products);
})

});

app.post('/insert',function(req,res){

    res.header('Access-Control-Allow-Origin',"*");
res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");

console.log(req.body);
var products={


    ProductId:req.body.products.ProductId,
    ProductName:req.body.products.ProductName,
    ProductCode:req.body.products.ProductCode,
    releaseDate:req.body.products.releaseDate,
    description:req.body.products.description,
    price:req.body.products.price,
    starrating:req.body.products.starrating,
    imageUrl:req.body.products.imageUrl
    

}

var products=new Productdata(products); 
products.save();

})


app.post('/register',function(req,res){
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
    console.log(req.body);

    var user={


        username:req.body.user.username,
        password:req.body.user.password,
        firstname:req.body.user.firstname,
        lastname:req.body.user.lastname,
        contactno:req.body.user.contactno

    }

    var user=new userdata(user); 
user.save();

});

app.get('/edit/_id',function(req,res){
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");
    var id=req.params.id;
    productdata.findOne({_id:id})
   .then(function(products){
       var data=products;
       console.log(products+"hii");

       res.render('/',{data});
      
   })
   
        // res.send(products);



   
})

app.get('/login',function(req,res){

    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");

    var user=req.body.username;
    var pass=req.body.password;
    userdata.findOne({username:user,password:pass})
    .then(function(data){
        if(data.username==user&&data.password==pass){
            res.redirect('/products');
        }
       
    })
    .catch(function(){
    res.redirect("/");
    })


})

app.post('/delete',function(req,res){

    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Methos: GET,POST,PATCH,PUT,DELETE,OPTIONS");
    console.log(req.body);
    var id=req.body.id;
console.log(id+"id get");
productdata.deleteOne({_id:id})
.then(products=>{

    console.log(products);
    res.send(products);

})


})

app.listen(5000);