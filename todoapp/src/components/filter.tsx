import React from 'react';

const Filter = ({data, activeDay,handleClick}: { data: string[], activeDay: string,handleClick:Function }): JSX.Element => {
    return (
        <div className="my-card">
            <ul>
                {
                    data.map((item) => {
                        return (
                            <li
                                className={item === activeDay ? 'active' : ''}
                                onClick={()=>handleClick(item)}
                            >{item}</li>
                        );
                    })
                }
            </ul>
        </div>);
};

export default Filter;