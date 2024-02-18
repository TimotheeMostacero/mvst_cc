import React from 'react';
import '../menuBar/menuBar.css';

/* Component representing the menu bar of the application.
 * It displays different menu items with corresponding icons.
 */
export default function MenuBar({repoCount}) {
    
    // JSX markup for the MenuBar component
    return (
        <div className="menu-bar">
            <div className="menu-item">
                <img className="icon" src="../images/overview-icon.png" alt="Overview Icon" />
                <span>Overview</span>
            </div>
            <div className="menu-item">
                <img className="icon" src="../images/repositories-icon.png" alt="Repositories Icon" />
                <span>Repositories</span>
                {/* Display repository count */}
                <span className="repo-count" style={{ color: '#fff' }}>{repoCount}</span>
            </div>
            <div className="menu-item">
                <img className="icon" src="../images/projects-icon.png" alt="Projects Icon" />
                <span>Projects</span>
            </div>
        </div>
    );
}
