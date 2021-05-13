const sql = require('mysql');
const connection = sql.createConnection({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : '123',
    database : 'expensedb'
});
//connect to the database
connection.connect((err) => {
    if(err){
        console.log('failed to connect');
    }
    console.log('connected to db');
});

function Update(name,cost,category,resp){
    //make the update to the database and respond to the front end
    connection.query('INSERT INTO expenses VALUES((SELECT IFNULL(MAX(id)+1,0) FROM expenses AS exp),\'' + name +'\','+cost+',\''+category+'\');', (err) => {
        if(err){console.log(err);}
        resp.status(200).send(JSON.stringify('Update Successful'));
    }); 
}
function Retrieve(resp){
    //Retrieve from the database and send the results to the front end
    let dataToSend = [];
    connection.query('SELECT * FROM expenses;', (err,rows) => {
        if(err){console.log(err);return;}
        dataToSend=rows;
        resp.status(200).send(JSON.stringify(dataToSend));
    });
}
function DeleteItem(id,resp){
    //Delete the selected entry from the database
    connection.query('DELETE FROM expenses WHERE id='+id+';', (err) => {
        if(err){console.log(err);}
        resp.status(200).send(JSON.stringify('Deletion Successful'));
    });
}

module.exports.Update = Update;
module.exports.Retrieve = Retrieve;
module.exports.DeleteItem = DeleteItem;