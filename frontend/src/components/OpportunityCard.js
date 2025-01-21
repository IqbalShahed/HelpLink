import React from 'react';
import Button from './Button';

const OpportunityCard = ({ title, description, location, scheduleStart, scheduleEnd, image, onClick }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <div className="border p-4 rounded shadow-sm bg-white">
            <div>
                {image && (
                    <img
                        src={`http://localhost:5000${image}`}
                        alt={title}
                        className="h-48 w-full object-cover"
                    />
                )}
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-gray-500 text-sm">Location: {location}</p>
            <p className="text-gray-500 text-sm">Schedule: {`${formatDate(scheduleStart)} to ${formatDate(scheduleEnd)}`}</p>
            <Button text="See Details" onClick={onClick} className="mt-4" />
        </div>
    );
};

export default OpportunityCard;
