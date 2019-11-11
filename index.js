const express = require('express')
const bodyParser = require('body-parser')
const stripe = require('stripe')('#apike')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}));
app.set('json spaces', 2);


//app.use('')
 app.post('/charge', ( req , res) => {

    var description = req.body.description
    var amount = req.body.amount 
    var currency = req.body.currency 
    var token = req.body.stripreToken

        

    stripe.charges.create(
        {
        amount: amount,
        currency: currency,
        source: token,
        description: description,
        },
        function(err, charge) {
                if(err){
                    console.log(err, req.body)
                    res.status(500).end()
                }else{
                    console.log( 'Succesful')
                    res.status(200).send()
                }
            }
        );
 });


 app.post('/registerPaymentMethod', ( req , res) => {


    
    
    stripe.paymentMethods.create({
        type: "card",
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2020,
          cvc: '123'
        }
      }, function(err, token) {
        if(err){
            console.log(err, req.body)
            res.status(500).end()
        }else{
            console.log( 'Succesful')
            res.send({ 'token': token.id })
            res.status(200).send()
        }
      });
    
 });


app.post('/registerCustomer', ( req , res) => {


    var token = req.body.stripreTokenPaymentMethod
    var email = req.body.email

    stripe.customers.create(
        {
          
          description: 'Customer for email:',
          email: email,
          payment_method: token
        },
        function(err, customer) {
            if(err){
                console.log(err, req.body)
                res.status(500).end()
            }else{
                console.log( 'Succesful')
                res.send({ 'customer': customer.id })
                res.status(200).send()
            }
        }
      );
    
 });


app.post('/registerCustomer', ( req , res) => {


    var token = req.body.stripreTokenPaymentMethod
    var email = req.body.email

    stripe.customers.create(
        {
          
          description: 'Customer for email:',
          email: email,
          payment_method: token
        },
        function(err, customer) {
            if(err){
                console.log(err, req.body)
                res.status(500).end()
            }else{
                console.log( 'Succesful')
                res.send({ 'customer': customer.id })
                res.status(200).send()
            }
        }
      );
    
 });


 app.post('/registerSubcription', ( req , res) => {


    var customer_id = req.body.customerId
    var amount_plan = req.body.amount
    var payment_method_id = req.body.paymentMethods
   
   
      stripe.plans.create(
        {
          amount: amount_plan,
          currency: 'mxn',
          interval: 'day',
          product: payment_method_id,
        },
        function(err, plan) {
            if(err){
                console.log(err, req.body)
                res.status(500).end()
            }else{
                console.log( 'Succesful')

                stripe.subscriptions.create({
                    customer: customer_id,
                    default_payment_method: paymentMethods,
                    items: [
                      {
                        plan: plan.id,
                        
                      },
                    ]
                  }, function(err, subscription) {
                        if(err){
                            console.log(err, req.body)
                            res.status(500).end()
                        }else{
                            console.log( 'Succesful')
                            res.send({ 'subcriptionid': subscription.id })
                            res.status(200).send()
                        }
                    }
                  );
            }
        }
      );
 });

app.get('/', function (req , res) {
    res.send("")
    
});

app.listen( 3000 , ()=>{
console.log("Listen port 3000")
});