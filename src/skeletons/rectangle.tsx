import * as React from 'react';

export interface RectangleProps {
    height: number,
    width: number,
}

const Rectangle: React.FC< RectangleProps > = ({height, width}) => {

    return (
        <div style={{width: `${width}px`, height: `${height}px`, background: "#e0e0e0", margin: "0", padding: "0"}} />
    )
};

export default Rectangle;
