import React, {useState} from 'react';

const List = ({data, handleCheck, handleDelete, activeDay}:
                  { data: any, handleCheck: Function, handleDelete: Function, activeDay: string}) => {
    const [] = useState<number>(0);
    let classList: string = `list-group-item mb-1 `;

    const showVisibile = function (): JSX.Element | null {
        let elementWeek:number;

        return (data.map((ele: { [U: string]: string }, index: number) => {
            if (ele.week === activeDay || activeDay ==='All') {
                return (
                    <li
                        className={classList + (ele.complete ? 'line-over' : '')}
                        key={index + ele.week}

                    >{ele.text}{(ele.complete) ?
                        null :
                        <>
                            <i className="fa fa-check withinListRight " onClick={() => handleCheck(index)}/>
                            <i className="fa fa-times withinListRight-1" onClick={() => handleDelete(index)}/>
                        </>}</li>
                )
            } else return null;
        }))

    };
    return (

        <ul className="list-group">
            {
                showVisibile()
            }
        </ul>

    );
};

export default List;