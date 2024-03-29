import React, {useState, useEffect} from 'react';
import '../repos/repos.css';

/* Component representing user repositories with filtering functionality.
 * It displays a list of user repositories and provides options for filtering them.
 */
export default function Repos({username, repos}) {

    // State variables for managing filters and filtered repositories
    const [repoTypeFilter, setRepoTypeFilter] = useState('All');
    const [languageFilter, setLanguageFilter] = useState('All');
    const [filter, setFilter] = useState('');
    const [filteredRepoCount, setFilteredRepoCount] = useState(0);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    // Effect hook to listen for Enter key press
    useEffect(() => {
        const handleEnterKeyPress = (e) => {
            if (e.key === 'Enter') {
                setShowMessage(true);
            }
        };

        document.addEventListener('keydown', handleEnterKeyPress);

        return () => {
            document.removeEventListener('keydown', handleEnterKeyPress);
        };
    }, []);

    // Effect hook to filter repositories based on filters
    useEffect(() => {
        const filteredRepos = repos.filter(repo => {
            const matchFilter = filter ? repo.name.toLowerCase().includes(filter.toLowerCase()) : true;
            const matchType = repoTypeFilter === 'All' || repo.private === (repoTypeFilter === 'Private');
            const matchLanguage = languageFilter === 'All' || (repo.language && repo.language.toLowerCase() === languageFilter.toLowerCase());
            return matchFilter && matchType && matchLanguage;
        });
        setFilteredRepos(filteredRepos);
        setFilteredRepoCount(filteredRepos.length);
    }, [filter, repoTypeFilter, languageFilter, repos]);

    // Function to clear all filters
    const clearFilter = () => {
        setFilter('');
        setRepoTypeFilter('All');
        setLanguageFilter('All');
        setShowMessage(false);
    };

    // Function to get color for language circle based on language
    const getLanguageColor = (language) => {
        switch (language.toLowerCase()) {
            case 'javascript':
                return 'yellow';
            case 'ruby':
                return 'purple';
            case 'typescript':
                return 'darkgreen';
            default:
                return 'orange';
        }
    };

    // JSX markup for the Repos component (find a Repo input and Repos filtered list output)
    return (
        <div className="repos-container">
            <div className="filter-select-container">
                <div className="filter-container">
                    <input
                        id="repository-filter"
                        type="text"
                        placeholder="Find a repository..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                <div className="label-container type-label">Type:</div>
                <div className="select-container">
                    <select id="repository-type" value={repoTypeFilter} onChange={(e) => setRepoTypeFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <div className="label-container language-label">Language:</div>
                <div className="select-container">
                    <select id="repository-language" value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
                        <option value="All">All</option>
                        {Array.from(new Set(repos.map(repo => repo.language))).map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            {showMessage && (
                <div className="filter-message-container">
                    <div className="filter-message">
                        {filteredRepoCount > 0 ? (
                            <>
                                <span><strong>{filteredRepoCount}</strong> results for repositories matching <strong>{filter}</strong></span>
                            </>
                        ) : (
                            <span>No results found for repositories matching <strong>{filter}</strong></span>
                        )}
                    </div>
                    <img className="icon" src="../images/cancel-icon.png" alt="Cancel Icon" onClick={clearFilter} />
                    <span className="clear-filter-label" onClick={clearFilter}>Clear filter</span>
                </div>
            )}

            <ul>
                {/* Display filtered repositories */}
                {filteredRepos.map(repo => (
                    <li key={repo.id} className="repo-item">
                        <div>
                            <strong>{repo.name}</strong> -
                            <p className="description">{repo.description}</p>
                            {/* Display language circle with appropriate color */}
                            {repo.language && (
                                <>
                                    <span className="language-circle" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                                    <span className="language">{repo.language}</span>
                                </>
                            )}
                            <span className="updated">Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <button className="star-button">
                            <img className="icon" src="../images/star-icon.png" alt="Star Icon" />
                            Star
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
