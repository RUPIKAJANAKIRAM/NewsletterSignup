const express = require('express');
const bodyParser = require('body-parser');
// const request =require('request');
const https=require('https');

var app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/signup",function(req,res){
    res.sendFile(__dirname+"\\signup.html");
})
app.post("/signup",function(req,res){
    // res.send("Success");
    const fName = req.body.inputFirstName;
    const lName = req.body.inputLastName;
    const email = req.body.inputEmail;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: fName,
                    LNAME:lName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/f53821c3e7"
    const options = {
        method: "POST",
        auth: "pika:37839fef25f60f33f4ca5a11a9c6c330-us21"
    };
    const request = https.request(url, options, function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"\\success.html");
        }
        else{
            res.sendFile(__dirname+"\\failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
    // res.send("<h4>Hello "+fName+" "+lName+". You will start receiving emails on "+email+" soon.</h4>")
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up and running");
})

// 37839fef25f60f33f4ca5a11a9c6c330-us21

// f53821c3e7