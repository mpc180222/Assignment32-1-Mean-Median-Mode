const express = require('express');
const ExpressError = require('./expressError')

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

// http://localhost:3000/mean?nums=1,3,5,7


function mean(values){

  let total = 0;
    let i = 0;
    while(i < values.length){
        total = total + values[i];
        i++;}
    return total/values.length;
}

function median(values){
  let middle = Math.floor(values.length/2);
  if(values.length % 2 === 0) return (values[middle-1]+values[middle])/2;
  if(values.length % 2 !== 0) return values[Math.floor((values.length)/2)];

}

function mode(values){
  let res;
  let counter = 0;
  let high = 0;
  for(let i = 0 ; i < values.length ; i++){
      for(let j = 0; j < values.length ; j++){
          if (values[j]===values[i]) counter++;}
      if(counter > high){
          high = counter;
          res = values[i];}
      counter = 0;}
      if(high ===1) return "All occurences are equal";
      return res;
}


app.get('/mean', function(req, res, next){
    let str = req.query['nums'];
    let values = str.split(',').map(num => +(num));
    if(values.some(function(value){
      return isNaN(value)})) throw new ExpressError("invalid number found", 400);
      
      if(str.length === 0) throw new ExpressError("nums are required", 400);
    let returnMean = mean(values);
    let response = {"operation": "mean", "value": returnMean};
    res.json(response);
} )

app.get('/median', function(req, res, next){
    let str = req.query['nums'];
    let values = str.split(',').map(num => +(num)).sort((a, b) => a-b);
    if(values.some(function(value){
      return isNaN(value)})){
        throw new ExpressError("invalid number found", 400);
      }
      if(str.length === 0){
        throw new ExpressError("nums are required", 400);
      }
    let returnedMedian = median(values);
    let response = {"operation": "median", "value": returnedMedian};
    res.json(response);
} )

app.get('/mode', function(req, res, next){

    let str = req.query['nums'];
    let values = str.split(',').map(num => +(num));
    if(values.some(function(value){
      return isNaN(value)})){
        throw new ExpressError("invalid number found", 400);
      }
      if(str.length === 0){
        throw new ExpressError("nums are required", 400);
      }
        let returnedMode = mode(values);
        let response = {"operation": "mode", "value": returnedMode};
        res.json(response);
} )



app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
  })
  
  
 
  app.use(function (err, req, res, next) { 
    let status = err.status || 500;
    let message = err.msg;
  
   
    return res.status(status).json({
      error: { message, status }
    });
  });
  
  app.listen(3000, () => {
    console.log("Server running on port 3000")
  });

  module.exports= {mean, median, mode};