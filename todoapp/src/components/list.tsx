import React from 'react';

const List = ({data}: { data: any }) => {
    return (

        <ul className="list-group">
            {
                data.map((ele: { [U: string]: string }, index: number) => {
                    return (
                        <li
                            className="list-group-item mb-1"
                            key={index}
                        >{ele.text}</li>
                    )
                })
            }
        </ul>

    );
};

export default List;