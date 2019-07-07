import React from 'react';

const List = ({data, handleCheck, handleDelete}: { data: any, handleCheck: Function, handleDelete: Function }) => {
    let classList: string = 'list-group-item mb-1 ';
    return (

        <ul className="list-group">
            {
                data.map((ele: { [U: string]: string }, index: number) => {
                    return (
                        <li
                            className={classList + (ele.complete ? 'line-over' : '')}
                            key={index}

                        >{ele.text}{(ele.complete) ?
                            null :
                            <>
                                <i className="fa fa-check withinListRight" onClick={() => handleCheck(index)}/>
                                <i className="fa fa-times withinListRight1" onClick={() => handleDelete(index)}/>
                            </>}</li>
                    )
                })
            }
        </ul>

    );
};

export default List;