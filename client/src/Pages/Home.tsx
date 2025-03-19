

import React, { useEffect, useState } from 'react'
import { fetchCollections } from '../services/api';
import { useNavigate} from 'react-router-dom';
import { IoEye, IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { formatDate } from '../utils/formatDate';

const Home:React.FC = () => {
    const [collections, setCollections] = useState<any[]>([]);
    const [filters, setFilters] = useState('');
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCollections().then(setCollections)
    },[]);

    const filteredCollections = filters 
    ? collections.filter((c) => c.type === filters) 
    : collections;

  return (
    <div className='bg-[#F5F8FA] h-[100vh]'>
        {/* Header */}
        <div className='h-[68px] flex w-full bg-white items-center pl-3'>
            <h1 className='text-2xl font-semibold text-[#29313A]'>Overview</h1>
        </div>
        {/* Search input */}

        {/* Content area */}
    <div className="content border-2 border-[#E6ECF0] bg-white m-3 rounded-lg p-3">

    {/* Search and Filter */}
    <div className='pb-3 flex gap-3 h-[45px]'>

        {/* Search */}
        <div className='relative flex items-center h-full'>
        <input type="text" 
        placeholder='Search'
        className='border h-full pl-2 pr-10 text-sm rounded-sm  md:w-[310px] border-[#C2CAD3] focus:outline-none focus:ring-1 focus:ring-blue-500'/>
        
        <IoSearch className='absolute right-3 text-gray-500 hover:text-blue-500'/>
        </div>

    {/* Filter */}
    <div className='relative h-full'>

        <button 
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className='px-3 text-xs font-semibold flex h-full items-center gap-2 border border-gray-300 rounded-lg bg-[#E1E4E9] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500'
        >Type
        <IoIosArrowDown className='' />
        </button>



        {isDropDownOpen && (
            <div className='absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                <ul className='py-1'>
                    <li className='px-3 py-2 text-sm hover:bg-gray-100'>All</li>
                    <li className='px-3 py-2 text-sm hover:bg-gray-100'>EP</li>
                    <li className='px-3 py-2 text-sm hover:bg-gray-100'>Album</li>
                    <li className='px-3 py-2 text-sm hover:bg-gray-100'>Single</li>
                </ul>
            </div>
        )}
    </div>
    </div>
        {/* Table */}
        <div className='w-full overflow-x-auto'>

        
        <table className='w-full border-collapse'>
            <thead>
                <tr className='border-b-2 border-gray-200'>
                    <th className='text-left py-3 px-4 font-medium'>Collection Name</th>
                    <th className='text-left py-3 px-4 font-medium'>Type</th>
                    <th className='text-left py-3 px-4 font-medium'>Song Count</th>
                    <th className='text-left py-3 px-4 font-medium'>Duration</th>
                    <th className='text-left py-3 px-4 font-medium'>Size</th>
                    <th className='text-left py-3 px-4 font-medium'>Released On</th>
                    <th className='text-left py-3 px-4 font-medium'></th>
                </tr>
            </thead>
            <tbody>
                {filteredCollections.map((collection) => (
                    <tr key={collection.id} className="border-b border-gray-200 h-[68px] text-sm">
                        <td className="py-3 px-4">
                            <div>
                                {collection.name}
                                <p className='text-xs text-slate-500'>{collection.artist}</p>
                                </div></td>
                        <td className="py-3 px-4">{collection.type}</td>
                        <td className="py-3 px-4">{collection.songCount}</td>
                        <td className="py-3 px-4">{Math.floor(collection.durationInSeconds / 60)} mins</td>
                        <td className="py-3 px-4">{(collection.sizeInBytes / (1024*1024)).toFixed(2)}MB</td>
                        <td className="py-3 px-4">{formatDate(collection.releasedOn)}</td>
                        <td className="py-3 px-4">

                            <button onClick={() => navigate(`/details/${collection.id}`)}
                                className="text-[#025992] text-sm flex items-center gap-1 hover:text-blue-800 cursor-pointer">
                                    <IoEye />
                                View Details
                            </button>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    </div>
  )
}

export default Home;