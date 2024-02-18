import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserInfo from './userInfo/UserInfo.jsx';
import Repos from './repos/Repos.jsx';
import MenuBar from './menuBar/MenuBar.jsx';
import '../App.css';

/* Component representing the main parent component of the GitHub Explorer application.
 * This component handles fetching user data and repositories from the GitHub API.
 */
export default function GithubExplorer() {

    // State variables for managing component data and UI
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [repoCount, setRepoCount] = useState(0);

    // GitHub access token for API authorization
    const accessToken = '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';

    // Effect hook to set document title on component mount
    useEffect(() => {
        document.title = "GitHub Repositories With Search Functionality";
    }, []);

    /* Function to fetch user data from the GitHub API.
     * It updates state variables accordingly based on the API response.
     */
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}`,
                {headers: {Authorization: `Bearer ${accessToken}`}}
            );
            setUserData(response.data);
            setError(null);
            fetchUserRepos();
            
        } catch (error) {
            setUserData(null);
            setError('User not found');
            setRepos([]);
        }
    };

    /* Function to fetch user repositories from the GitHub API.
     * It paginates through the user's repositories and updates state variables.
     */
    const fetchUserRepos = async () => {
        try {
            let allRepos = [];
            let page = 1;
            const perPage = 100;

            while (true) {
                const response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: {Authorization: `Bearer ${accessToken}`},
                        params: {page: page, per_page: perPage}
                    }
                );
                const reposOnPage = response.data;

                if (reposOnPage.length === 0) {
                    break;
                }

                allRepos = [...allRepos, ...reposOnPage];
                page++;
            }

            setRepos(allRepos);
            setError(null);
            setRepoCount(allRepos.length);

        } catch (error) {
            setRepos([]);
            setError('Failed to fetch repositories');
        }
    };

    // JSX markup for the GithubExplorer component
    return (
        <div className="container">
            <div className="left">
                <div className="input-container">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter GitHub Username"
                    />
                    <button onClick={fetchUserData}>Search</button>
                </div>

                {error && <p>{error}</p>}

                <UserInfo username={username} userData={userData}/>
            </div>
            <div className="right">
                <div className="menu-bar-container">
                    <MenuBar repoCount={repoCount}/>
                </div>
                <Repos username={username} repos={repos} filter={filter} setFilter={setFilter}/>
            </div>
        </div>
    );
}
