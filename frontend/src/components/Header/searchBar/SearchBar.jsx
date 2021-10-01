import React, { useState, useEffect } from 'react'
import { filterCompanysByName } from '../../../logic/company/find/filter';
import { getUserByName } from '../../../logic/user/find/filter';
import CloseIcon from "../../../assets/svg/close.svg";
import CompanyIcon from "../../../assets/svg/company.svg";
import Avatar from "../../../assets/svg/avatar.svg";
import { useHistory } from 'react-router-dom';

function SearchBar() {
    const [search, setSearch] = useState("");
    const [searched, setSearched] = useState(false);
    const [results, setResults] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if(search.length === 0 && results.length > 0){
            setSearched(false);
        }
        if(!searched && results.length > 0){
            setResults([]);
        }
    }, [searched, search, results]);

    const searchDB = (e) => {
        e.preventDefault();
        getUserByName(search, results, setResults);
        filterCompanysByName(search, results, setResults);
        setSearched(true);
    }

    return (
        <form className="header__search">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cilvēki, kompānijas..."
            />
            <button type="submit" onClick={(e) => {setResults([]);searchDB(e)}}>Meklēt</button>

            {searched && (
                <div className="header__search__results">
                    {results.length > 0 ? (
                        <ul className="header__search__results__all">
                            <div className="header__search__results__all__header">
                                <p>Aizvērt</p>
                                <img src={CloseIcon} alt="close" onClick={() => {setSearched(false);setResults([])}} />
                            </div>

                            {results.map((result, i) => {
                                if(result.is_employer){
                                    return (
                                        <li key={i} onClick={() => {history.push(`/profile/${result.id}`);setSearched(false);setResults([])}}>
                                            <img src={result.profile.logo ? result.profile.logo : CompanyIcon} alt={result.profile.company_name} />
                                            <h4>{result.profile.company_name}</h4>
                                        </li>
                                    )
                                }else{
                                    return(
                                        <li key={i} onClick={() => {history.push(`/profile/${result.id}`);setSearched(false);setResults([])}}>
                                            <img src={result.profile.photo ? result.profile.photo : Avatar} alt={result.first_name} />
                                            <h4>{result.first_name} {result.last_name}</h4>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    ) : (
                        <div className="header__search__results__noResults">
                            <div className="header__search__results__noResults__header">
                                <p>Aizvērt</p>
                                <img src={CloseIcon} alt="close" onClick={() => {setSearched(false);setResults([])}} />
                            </div>
                            <p>Neatradām nevienu kompāniju vai lietotāju</p>
                        </div>
                    )}
                </div>
            )}
        </form>
    )
}

export default SearchBar
