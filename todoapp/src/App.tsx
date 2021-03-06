import React, {useCallback, useEffect, useState} from 'react';
import List from "./components/list"
import Filter from "./components/filter";
import JSON1 from "./db.json";
import {CountingProperty} from "./helper/Counting";

type FormElem = React.FormEvent<HTMLFormElement>;

export interface ITodo {
    text: string,
    complete: boolean,
    week: string
}

function gerPrefColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)");
}


function getInitialMode(): boolean {
    const isReturningUser = "blue" in localStorage;
    const saveMode = localStorage.getItem("blue") == 'true';
    const userPrefer = gerPrefColorScheme();
    if (isReturningUser) {
        return saveMode;
    } else if (userPrefer) {
        return true;
    } else {
        return false;
    }
}


function App(): JSX.Element {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>(JSON1);
    const Weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'All'];
    const [weekDay, setWeekDay] = useState<string>(Weekdays[0]);

    const [blueMode, setblueMode] = useState<boolean>(getInitialMode());

    useEffect(() => {
        localStorage.setItem("blue", JSON.stringify(blueMode));
    }, [blueMode]);


    const ColorMode = (blueMode ? "blueMode" : "darkMode");
    const btnMode = (ColorMode === "blueMode" ? "btn-warning" : "btn-danger");

    const handleSubmit = function (e: FormElem): void {
        e.preventDefault();
        addTodo(value, todos);
        setValue("");//to get it reinitialize itself
    };

    const addTodo = useCallback(function (text: string, todos: Array<ITodo>): void { /*here will be added the all code*/
        let IT: ITodo[];
        if (weekDay === 'All') {
            /*
                        let filtered = Weekdays.reduce((acc, item, index) => {
                            let obj = {
                                text: text,
                                complete: false,
                                week: item
                            };
                            if (index) {
                                return [...acc, obj];
                            } else return [obj];
                        }, [{}]);

            */
            let newTodos: ITodo[] = [...todos];

            Weekdays.forEach((item, index) => {
                if (item !== 'All') {
                    let obj: ITodo = {
                        text: text,
                        complete: false,
                        week: item
                    };
                    newTodos = [...newTodos, obj];
                }
            });

            setTodos(newTodos);
        } else {
            const newTodos: ITodo[] = [...todos, {text, complete: false, week: weekDay}];
            setTodos(newTodos);
        }
    }, [value, todos]);

    const completeTodo = useCallback(function (index: number,todos:Array<ITodo>): void {
        const newTodos: ITodo[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodos(newTodos);
    },[todos]);

    const deleteTodo = function (index: number, activeWeek: string, todos: Array<ITodo>): void {
        let Filtered = todos.filter((item, ind) => {
            if (activeWeek !== 'All') {
                return index !== ind;
            } else {
                return 1;
            }
        });
        setTodos(Filtered);
    };

    const deleteAll = function (activeWeek: string): void { /*here for all*/
        if (activeWeek === 'All') {
            setTodos([]);
            return;
        }
        let Filtered = todos.filter((item) => {
            return item.week !== activeWeek;
        });
        setTodos(Filtered);
    };
    const handleClick = function (weekday: string): void {
        setWeekDay(weekday);
    };
    return (
        <div className={`main ${ColorMode}`}>
            <div className="container">
                <div>
                    <h1 className="text-danger">Todo List</h1>
                    <div className="pull-right labelIcons">
                        <i className="fa fa-sun"/>
                        <label className="switch mt-2">
                            <input type="checkbox" checked={blueMode}
                                   onChange={() => setblueMode(!blueMode)}
                            />
                            <span className="slider round"></span>
                        </label>
                        <i className="fas fa-moon"/>
                    </div>

                </div>
                <Filter data={Weekdays} activeDay={weekDay} handleClick={handleClick}/>
                <div className="clearfix">
                    <form onSubmit={handleSubmit}>
                        <input type="text" required className="form-control" value={value}
                               onChange={e => setValue(e.target.value)}/>
                        <button type="submit" className={`btn ${btnMode} mt-2 pull-right`}>Add Todo</button>
                    </form>
                </div>

                <section className="mt-20 ">
                    <List data={todos} activeDay={weekDay} handleCheck={completeTodo} handleDelete={deleteTodo}
                    />
                    {(CountingProperty(todos, weekDay, "week")) ?
                        <button
                            className={`btn ${btnMode} mt-2 pull-right`}
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
