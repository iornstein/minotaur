import React from 'react';
import './App.css';
import DaysSinceProduction from "./components/DaysSinceProduction";

const App: React.FC = () => {
    return (
        <div className="minotaur">
            <DaysSinceProduction/>
        </div>
    );
};

export default App;
