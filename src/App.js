import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TabContainer from './TabContainer';

function App() {

  let [todolist, settodolist] = useState([]);

  const errmsg = () => toast.error("ToDo Name Already Exists....");
  
  let saveTodoList = (event) => {
    event.preventDefault(); // ✅ first

    let ToName = event.target.ToName.value.trim(); // ✅ defined early

    if (!ToName) return; // optional empty check

    if (!todolist.includes(ToName)) {
      let finalToDO = [...todolist, ToName];
      settodolist(finalToDO);
      event.target.reset(); // optional
    } else {
      errmsg(); // ✅ correct usage
    }
  };

  let list =todolist.map((value, index) => {
    return(
      <ToDoListItems value = {value} key={index} indexnumber = {index}  
          todolist = {todolist}
          settodolist = {settodolist}
      />
    )
  })

  return (
    <div className="App">

      <TabContainer/>
      <h1>TODO List</h1>

      <form onSubmit={saveTodoList}>
        <input type="text" name="ToName" />
        <button>Save</button>
      </form>

      <div className='outerDiv'>
        <ul>
          {list}
          
        </ul>
      </div>

      <ToastContainer /> {/* ✅ render once */}
    </div>
  );
}

export default App;

function ToDoListItems({value, indexnumber, todolist, settodolist}){


  let [status, setStatus] = useState(false);
  const successmsg = () => toast.success('ToDo Deleted Successflly...');

  let DeleteRow= () =>{
    let FinalData = todolist.filter((v, i) => i != indexnumber)
    settodolist(FinalData)
    successmsg();
  }

  let CheckStatus = () =>{
    setStatus(!status)

  }

  return( 
    <li className={(status) ? 'completeTodo' : ''} onClick={CheckStatus}>
      {indexnumber+1}. {value} <span onClick={DeleteRow}>&times;</span>
    </li>
  )
}