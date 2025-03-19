
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchCollectionById } from '../services/api';

interface IAlbum {
    name: string;
    artist: string;
    type: string;
    songCount: number;
    songs:{
        title: string;
        durationInSeconds:number;
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
    <div>
       <h1>{album.name}</h1>
      <p>Artist: {album.artist}</p>
      <p>Type: {album.type}</p>
      <p>Songs: {album.songCount}</p>
      <h2>Songs</h2>
      <ul>
        {album.songs.map((song, index) => (
          <li key={index}>
            {song.title} - {song.durationInSeconds}s
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AlbumDetails;