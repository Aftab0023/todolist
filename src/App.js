import './App.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TabContainer from './TabContainer';
import { tabsData } from './Data/tabs';

function App() {
  

  let [todolist, settodolist] = useState(() => {
    let saved = localStorage.getItem("todolist");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);



  const errmsg = () => toast.error("ToDo Name Already Exists....");
  
  let saveTodoList = (event) => {
    event.preventDefault(); // ✅ first

    let ToName = event.target.ToName.value.trim(); // ✅ defined early

    if (!ToName) return; // optional empty check

    if (!todolist.includes(ToName)) {
      let finalToDO = [...todolist, { text: ToName, completed: false }];
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

      <TabContainer />
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

function ToDoListItems({ value, indexnumber, todolist, settodolist }) {

  let [status, setStatus] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editValue, setEditValue] = useState(value);

  const successmsg = () => toast.success('ToDo Deleted Successfully...');

  let DeleteRow = (e) => {
    e.stopPropagation();
    let FinalData = todolist.filter((v, i) => i !== indexnumber);
    settodolist(FinalData);
    successmsg();
  };

  let CheckStatus = () => {
    if (!isEdit) {
      setStatus(!status);
    }
  };

  let startEdit = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  let saveEdit = () => {
    let updatedTodos = todolist.map((v, i) =>
      i === indexnumber ? editValue : v
    );
    settodolist(updatedTodos);
    setIsEdit(false);
  };

  return (
    <li
      className={(status) ? 'completeTodo' : ''}
      onClick={CheckStatus}
    >
      {indexnumber + 1}.{" "}

      {isEdit ? (
        <input
          type="text"
          value={editValue}
          autoFocus
          onChange={(e) => setEditValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setIsEdit(false);
          }}
        />
      ) : (
        value
      )}

      {" "}
      {!isEdit && (
        <span onClick={startEdit} style={{ marginRight: "20px", cursor: "pointer" }}>
          ✏️
        </span>
      )}

      <span onClick={DeleteRow} style={{ cursor: "pointer" }}>
        &times;
      </span>
    </li>
  );
}
