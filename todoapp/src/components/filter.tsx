import React from 'react';

const Filter = ({data, activeDay,handleClick,colorMode}: { data: string[], activeDay: string,handleClick:Function,colorMode:string }): JSX.Element => {
    return (
        <div className="my-card">
            <ul>
                {
                    data.map((item,index) => {
                        return (
                            <li
                                className={item === activeDay ? `${colorMode} active` : `${colorMode}`}
                                onClick={()=>handleClick(item)}
                                key={index}
                            >{item}</li>
                        );
                    })
                }
            </ul>
        </div>);
};

export default Filter;