import React from 'react';

const List = ({data}: { data: any }) => {
    return (

        <ul className="list-group">
            {
                data.map((ele: string | number, index: number) => {
                    return <li className="list-group-item">{ele}</li>
                })
            }
        </ul>

    );
};

export default List;