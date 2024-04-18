// Clock.js

import { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
    const [dateTime, setDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function getCurrentDateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = now.getFullYear();

        return {
            time: `${hours}:${minutes}:${seconds}`,
            date: `${date}/${month}/${year}`,
        };
    }

    return (
        <div className="border-2 border-green-300 p-2 text-center">
            <div className="text-xl font-bold text-green-400">{dateTime.time}</div>
            <div className="font-bold text-green-400">{dateTime.date}</div>
        </div>
    );
};

export default Clock;
