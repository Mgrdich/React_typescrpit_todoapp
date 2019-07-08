import React from 'react';

const Filter = ({data}: { data: string[] }): JSX.Element => {
    return (
        <div className="my-card">
            <ul>
                {
                    data.map((item)=> {
                        return (
                          <li>{item}</li>
                        );
                    })
                }
            </ul>
        </div>);
};

export default Filter;