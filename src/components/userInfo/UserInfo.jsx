import React from 'react';
import '../userInfo/userInfo.css';

/* Component representing user information.
 * It displays user profile details fetched from the GitHub API.
 */
export default function UserInfo({username, userData}) {

    // JSX markup for the UserInfo component
    return (
        <div className="user-info">
            {userData && (
                <div className="profile">
                    <div className="profile-photo">
                        <img src={userData.avatar_url} alt="User Avatar"/>
                    </div>
                    <h2 className="real-name">{userData.name}</h2>
                    <p className="username">{userData.login}</p>
                    <p className="description">{userData.bio}</p>
                    <div className="buttons">
                        <button className="follow-button">Follow</button>
                        <button className="options-button">···</button>
                    </div>
                    <div className="stats">
                        <img className="icon" src="../images/users-icon.png" alt="Followers Icon"/>
                        <span className="stat-count">{userData.followers}</span>
                        <span className="stat-label">followers</span>
                        <span className="separator">·</span>
                        <span className="stat-count">{userData.following}</span>
                        <span className="stat-label">following</span>
                        <span className="separator">·</span>
                        <img className="icon" src="../images/star-icon.png" alt="Stars Icon"/>
                        <span className="stat-count">{userData.public_repos}</span>
                    </div>
                    <div className="contact">
                        <img className="icon" src="../images/email-icon.png" alt="Email Icon"/>
                        <span className="email">{userData.email || 'Not available'}</span>
                    </div>
                    <hr className="separator"/>
                    <h3 className="organizations-heading">Organizations</h3>
                    <div className="organization-photos">
                        <img className="org" src="../images/org1.png" alt="Organization 1"/>
                        <img className="org" src="../images/org2.png" alt="Organization 2"/>
                        <img className="org" src="../images/org3.png" alt="Organization 3"/>
                        <img className="org" src="../images/org4.png" alt="Organization 4"/>
                        <img className="org" src="../images/org5.png" alt="Organization 5"/>
                        <img className="org" src="../images/org6.png" alt="Organization 6"/>
                    </div>
                </div>
            )}
        </div>
    );
}
