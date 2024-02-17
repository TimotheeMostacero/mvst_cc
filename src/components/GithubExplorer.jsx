import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserInfo from './userInfo/UserInfo.jsx';
import Repos from './repos/Repos.jsx';
import MenuBar from './menuBar/MenuBar.jsx';
import '../App.css';

export default function GithubExplorer() {

    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [repoCount, setRepoCount] = useState(0);

    const accessToken = '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';

    useEffect(() => {
        document.title = "GitHub Repositories With Search Functionality";
    }, []);

    const fetchUserData = async () => {
        
        try {
            const response = await axios.get(
                `https://api.github.com/users/${username}`, 
                { headers: { Authorization: `Bearer ${accessToken}` } }
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

    const fetchUserRepos = async () => {

        try {
            let allRepos = [];
            let page = 1;
            const perPage = 100;
    
            while (true) {
                const response = await axios.get(
                    `https://api.github.com/users/${username}/repos`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                        params: { page: page, per_page: perPage }
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

                <UserInfo username={username} userData={userData} />
            </div>
            <div className="right">
                <div className="menu-bar-container">
                    <MenuBar repoCount={repoCount} />
                </div>
                <Repos username={username} repos={repos} filter={filter} setFilter={setFilter} />
            </div>
        </div>
    );
}
