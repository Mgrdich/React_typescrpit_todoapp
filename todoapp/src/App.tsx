import React, {useState} from 'react';
import List from "./components/list"
import Filter from "./components/filter";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
    text: string,
    complete: boolean
}


function App(): JSX.Element {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleSubmit = function (e: FormElem): void {
        e.preventDefault();
        addTodo(value);
        setValue("");//to get it reinitialize itself

    };
    const addTodo = function (text: string): void {
        const newTodos: ITodo[] = [...todos, {text, complete: false}];
        setTodos(newTodos);
    };

    const completeTodo = function (index: number): void {
        const newTodos: ITodo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
    };
    const deleteTodo = function (index: number):void {
        let Filtered = todos.filter((item, ind) => {
            return index !== ind;
        });
        setTodos(Filtered);
    };
    const deleteAll = function () {
      setTodos([]);
    };
    return (
        <>
            <div className="container">
                <h1 className="text-danger">Todo List</h1>
                <Filter/>
                <div className="clearfix">
                    <form onSubmit={handleSubmit}>
                        <input type="text" required className="form-control" value={value}
                               onChange={e => setValue(e.target.value)}/>
                        <button type="submit" className="btn btn-danger mt-2 pull-right">Add Todo</button>
                    </form>
                </div>

                <section className="mt-20 ">
                    <List data={todos} handleCheck={completeTodo} handleDelete={deleteTodo}/>
                    {(todos.length) ?
                        <button
                        className="btn btn-danger mt-2 pull-right"
                        onClick={deleteAll}
                        >
                        delete
                    </button> : null
                    }
                </section>


            </div>
        </>
    );
}

export default App;
