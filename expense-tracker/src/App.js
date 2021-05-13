import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  //state for holding past expenses
  const [expenses, setExpenses] = useState(undefined);
  //state for forcing a refresh of the page
  const [refresh, setRefresh] = useState(false);
  //available categories of expenses
  const Categories = ['Advertising', 'Insurance', 'Office', 'Supplies', 'Other'];
  //total cost of expenses
  const [totalExpenses,setTotalExpenses] = useState(0);
  //get past expenses from backend
  useEffect( () => {
    async function getData(){
      let data;
      //total cost of expenses
      let sumOfExpenses = 0;
      //making get expenses request to backend
      await fetch(process.env.REACT_APP_SERVER+process.env.REACT_APP_API_GETEXPENSES).then((res) => res.json()).then((results) => data = results);
      //verifying the received data from the request made isn't empty
      if(typeof(data) !== 'undefined'){
        //converting recieved expenses for displaying
        data = data.map((currObj) => {
          //add up cost of expenses
          sumOfExpenses += currObj.cost;
          return <>
            <div>{currObj.name}</div>
            <div>${currObj.cost}</div>
            <div>{currObj.category}</div>
            <div className='expense-record-delete' style={{justifySelf: 'center', cursor: 'pointer'}} id={currObj.id} onClick={(event) => handleDelete(event)}>
              remove
            </div>
            </>;
        });
    }
      //update the state of expenses
      setExpenses(data);
      //update the cost of expenses
      setTotalExpenses(sumOfExpenses);
    }
    //only attempt to get a request for expenses on first page load or changes made
    if(typeof(expenses) === 'undefined' || refresh){
      getData();
      //reset the flag for refreshing
      setRefresh(false);
    }
  });

  //function for handling deletion of an expense
  function handleDelete(event){
    async function performDelete(){
      //get the id of the past expense
      let id = event.target.id;
      //send a delete request to the backend for deletion of the expense with given id
      await fetch(process.env.REACT_APP_SERVER+process.env.REACT_APP_API_DELETEITEM+'?id='+id);
      //force a refresh of the page
      setRefresh(true);
    }
    performDelete();
  }

  //function for handling add button
  function handleAdd(){
    async function performAdd(){
    //get values from form
    let name = document.getElementById('expense');
    let cost = document.getElementById('cost');
    let category = document.getElementById('category');
    // error check of inputs
    if(name.value.trim() === ''){
      name.classList.add('error-border');
      return;
    }
    if(cost.value === ''){
      cost.classList.add('error-border');
      return;
    }

    //call the backend to add this expense
    await fetch(process.env.REACT_APP_SERVER+process.env.REACT_APP_API_UPDATE+'?name='+name.value+'&cost='+cost.value+'&category='+category.value).then((res) => res.json()).then((results) => console.log(results));
    //clear form
    name.classList.remove('error-border');
    cost.classList.remove('error-border');
    name.value = '';
    cost.value = '';
    //refresh the page
    setRefresh(true);
  }
  performAdd();
  }
  //Enforcing the value of Cost is of 2 digits
  function convertToNumber(){
    let cost = document.getElementById('cost');
    cost.value = parseFloat(cost.value).toFixed(2);
  }
//Render of App.js
  return (
    <div className='app-div-container'>
        <h1 style={{fontSize: '3em'}}>Expense Tracker</h1>
        <div className='app-form-top'>
            <div>
              <h1>Expense</h1>
              <input name='Expense' type='text' id='expense' />
            </div>
            <div>
              <h1>Cost</h1>
              <input name='Cost' type='number' id='cost' onBlur={convertToNumber} />
            </div>
            <div>
              <h1>Category</h1>
              <select id='category'>
                {Categories.map((currObj)=>{
                  return <option value={currObj}>{currObj}</option>
                })}
              </select>
            </div>
            <div className='app-button'><button onClick={handleAdd}>Add</button></div>
        </div>
    <div className='app-form-bottom'>
          <h1 style={{marginBottom: '5vh'}}>Expenses</h1>
          <div className='expense-record'>
            <div className='expense-record-headers'>Name</div>
            <div className='expense-record-headers'>Cost</div>
            <div className='expense-record-headers'>Category</div>
            <div className='expense-record-headers'>Deletion</div>
          {expenses}  
          </div>
      </div>
            <h1 style={{marginTop: '10vh',fontSize: '3em'}}>Total Cost: ${totalExpenses}</h1>
    </div>
  );
}

export default App;
