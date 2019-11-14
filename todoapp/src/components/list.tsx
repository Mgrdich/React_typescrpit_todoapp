import React, {useState} from 'react';

const showVisibile = function (data:any,activeDay:string,classList:string,handleCheck:Function,handleDelete:Function): JSX.Element | null {
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
                        <i className="fa fa-check withinListRight " onClick={() => handleCheck(index,data)}/>
                        <i className="fa fa-times withinListRight-1" onClick={() => handleDelete(index,activeDay,data)}/>
                    </>}</li>
            )
        } else return null;
    }))

};

const List:React.FC<any> = ({data, handleCheck, handleDelete, activeDay}:
                  { data: any, handleCheck: Function, handleDelete: Function, activeDay: string}) => {

    const [] = useState<number>(0);
    let classList: string = `list-group-item mb-1 `;

    return (

        <ul className="list-group">
            {
                showVisibile(data,activeDay,classList,handleCheck,handleDelete)
            }
        </ul>

    );
};

export default List;