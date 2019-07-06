import React, {useState} from 'react';


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
    const addTodo = function (text: string):void {
        const newTodos:ITodo[] = [...todos,{text,complete:false}];
        setTodos(newTodos);
    };
    return (
        <>
            <div>
                <h1>Todo List</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" required className="form-control" value={value}
                           onChange={e => setValue(e.target.value)}/>
                    <button type="submit" className="btn btn-info mt-2">Add Todo</button>
                </form>
            </div>
        </>
    );
}

export default App;
