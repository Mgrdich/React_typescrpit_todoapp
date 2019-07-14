import React, {useState} from 'react';
import List from "./components/list"
import Filter from "./components/filter";
import JSON from "./db.json";
import {CountingProperty} from "./helper/Counting";

type FormElem = React.FormEvent<HTMLFormElement>;

export interface ITodo {
    text: string,
    complete: boolean,
    week: string
}


function App(): JSX.Element {

    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>(JSON);
    const Weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','All'];
    const [weekDay, setWeekDay] = useState<string>(Weekdays[0]);

    const [blueMood,setBlueMood] = useState<boolean>(true);

    const handleSubmit = function (e: FormElem): void {
        e.preventDefault();
        addTodo(value);
        setValue("");//to get it reinitialize itself

    };
    const addTodo = function (text: string): void {
        const newTodos: ITodo[] = [...todos, {text, complete: false, week: weekDay}];
        setTodos(newTodos);
    };

    const completeTodo = function (index: number): void {
        const newTodos: ITodo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
    };
    const deleteTodo = function (index: number,activeWeek:string): void {
        let Filtered = todos.filter((item, ind) => {
            if(activeWeek!=='All') {
                return index !== ind;
            }else {
              return 1;
            }
        });
        setTodos(Filtered);
    };
    const deleteAll = function (activeWeek: string): void {
        let Filtered = todos.filter((item) => {
            return item.week !== activeWeek;
        });
        setTodos(Filtered);
    };
    const handleClick = function (weekday: string): void {
        setWeekDay(weekday);
    };
    return (
        <div className={"main "+(blueMood ? "blueMood":"darkMood")}>
            <div className="container">
                <h1 className="text-danger">Todo List</h1>
                <Filter data={Weekdays} activeDay={weekDay} handleClick={handleClick}/>
                <div className="clearfix">
                    <form onSubmit={handleSubmit}>
                        <input type="text" required className="form-control" value={value}
                               onChange={e => setValue(e.target.value)}/>
                        <button type="submit" className="btn btn-danger mt-2 pull-right">Add Todo</button>
                    </form>
                </div>

                <section className="mt-20 ">
                    <List data={todos} activeDay={weekDay} handleCheck={completeTodo} handleDelete={deleteTodo}/>
                    {(CountingProperty(todos, weekDay, "week")) ?
                        <button
                            className="btn btn-danger mt-2 pull-right"
                            onClick={() => deleteAll(weekDay)}
                        >
                            delete
                        </button> : null
                    }
                </section>


            </div>
        </div>
    );
}

export default App;
