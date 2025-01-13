import React from 'react';
import Button from './Button';

const Card = ({ title, description, location, onClick }) => {
    return (
        <div className="card border p-4 rounded shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-gray-500 text-sm">Location: {location}</p>
            <Button text="See Details" onClick={onClick} className="mt-4" />
        </div>
    );
};

export default Card;
