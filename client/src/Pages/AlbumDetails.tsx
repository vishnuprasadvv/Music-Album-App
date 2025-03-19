
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchCollectionById } from '../services/api';
import { IoIosArrowForward } from 'react-icons/io';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';
import { Link } from 'react-router-dom';

interface IAlbum {
    name: string;
    artist: string;
    type: string;
    songCount: number;
    durationInSeconds: number;
    sizeInBytes: number;
    releasedOn:Date;

    songs:{
        title: string;
        performers:string[];
        durationInSeconds:number;
        sizeInBytes: number;
    }[]
}

const AlbumDetails:React.FC = () => {
    const {id} = useParams();
    const [album, setAlbum] = useState<IAlbum | null>(null);
    console.log(id)

    if(!id) return;
    useEffect(() => {

        fetchCollectionById('12345').then(setAlbum)
    }, [id]);

    if(!album) return <p>Loading...</p>

  return (
    <div className='bg-[#F5F8FA] h-[100vh]'>
        {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 pl-3 py-2">
        <Link to="/" className="text-slate-500 text-sm hover:underline font-medium">
          Overview
        </Link> 
        <IoIosArrowForward  className='text-gray-600 '/>

        <span className="text-gray-600  text-sm">{album.name}</span>
        </div>
        {/* Album title */}
      <div className="p-6 bg-white border-b">
        <h1 className="text-2xl font-medium text-gray-800">{album.name}</h1>
      </div>
      {/* Album summary */}
      <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Artist</h2>
          <p className="text-gray-900">{album.artist}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Type</h2>
          <p className="text-gray-900">{album.type}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Song Count</h2>
          <p className="text-gray-900">{album.songCount}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Size</h2>
          <p className="text-gray-900">{(album.sizeInBytes / (1024*1024)).toFixed(2)} MB</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h2>
          <p className="text-gray-900">{Math.floor(album.durationInSeconds / 60)} mins</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Released On</h2>
          <p className="text-gray-900">{formatDate(album.releasedOn)}</p>
        </div>
      </div>

      {/* Songs table */}
      <div className="p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="py-3 px-4 font-medium text-gray-500">Song</th>
              <th className="py-3 px-4 font-medium text-gray-500">Performers</th>
              <th className="py-3 px-4 font-medium text-gray-500">Duration</th>
              <th className="py-3 px-4 font-medium text-gray-500">Size</th>
            </tr>
          </thead>
          <tbody>
            {album.songs.map((song, index) => (

            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-4 px-4 text-gray-800">{song.title}</td>
              <td className="py-4 px-4 text-gray-800">{song.performers.join(',')}</td>
              <td className="py-4 px-4 text-gray-800">{formatTime(song.durationInSeconds)}</td>
              <td className="py-4 px-4 text-gray-800">{(song.sizeInBytes / (1024*1024)).toFixed(2)} MB</td>
            </tr>
            ))}
            
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default AlbumDetails;