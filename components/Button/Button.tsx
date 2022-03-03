import * as React from 'react';

export interface IButtonProps {
    name: string,
    onClick?: () => void,
    
}

export default function Button ({name, onClick}: IButtonProps) {

 
  return (
    <div className="button">
        <div className="button__text" onClick={onClick}>{name}</div>
    </div>
  );
}
