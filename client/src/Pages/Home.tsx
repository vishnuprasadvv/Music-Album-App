'use strict';

import React, { useEffect, useState } from 'react'
import { fetchCollections } from '../services/api';
import { useNavigate} from 'react-router-dom';

const Home:React.FC = () => {
    const [collections, setCollections] = useState<any[]>([]);
    const [filters, setFilters] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCollections().then(setCollections)
    },[]);

    const filteredCollections = filters 
    ? collections.filter((c) => c.type === filters) 
    : collections;

  return (
    <div>
        <h1>Overview</h1>
        {/* Search input */}

        <input type="text" />

        <label htmlFor="">Type</label>
        <select onChange={(e) => setFilters(e.target.value)}>
            <option value="">All</option>
            <option value="EP">EP</option>
            <option value="Album">Album</option>
            <option value="Single">Single</option>
        </select>
        {/* Table */}
        <table>
            <thead>
                <tr>
                    <th>Collection Name</th>
                    <th>Type</th>
                    <th>Song Count</th>
                    <th>Duration</th>
                    <th>Size</th>
                    <th>Released On</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredCollections.map((collection) => (
                    <tr key={collection.id}>
                        <td>{collection.name}</td>
                        <td>{collection.type}</td>
                        <td>{collection.songCount}</td>
                        <td>{Math.floor(collection.durationInSeconds / 60)} mins</td>
                        <td>{new Date(collection.releasedOn).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => navigate(`/details/${collection.id}`)}>
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home;