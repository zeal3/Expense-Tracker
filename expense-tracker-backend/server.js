//load express
const db = require('./dbupdater');
const express = require('express');
//set port
const port = 5000;
const server = express();
//cors configuration
server.use(function(req,resp,next){
    resp.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    next();
});
//listen for an update request
server.get('/update', (req,resp) => {
    //parse queries
    let name = req.query.name.toUpperCase();
    let cost = req.query.cost;
    let category = req.query.category;
    //send update request to sql
    db.Update(name,cost,category,resp);
});
//listen for a delete request
server.get('/delete', (req,resp) => {
    //parse queries
    let id = req.query.id;
    //send delete request to sql
    db.DeleteItem(id,resp);
});
//listen for a retrieve request
server.get('/getExpenses',(req,resp) => {
    db.Retrieve(resp);
});

//listen
server.listen(port, ()=>{
    console.log('server started on port ' + port);
});