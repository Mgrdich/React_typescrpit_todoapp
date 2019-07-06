import React, {useState} from 'react';

function App(): JSX.Element {
    const [value, setValue] = useState<string>("");
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };
    return (
        <>
            <div>
                <h1>Todo List</h1>
                <form action="">
                    <input type="text" required className="form-control" value={value} onChange={e => setValue(e.target.value)}/>
                    <button type="submit" className="btn btn-info mt-2">Add Todo</button>
                </form>
            </div>
        </>
    );
}

export default App;
