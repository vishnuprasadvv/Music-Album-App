import axios from 'axios';

export const fetchCollections = async () => {
    const response = await axios.get('http://localhost:5000/collections');
    return response.data;
};

export const fetchCollectionById = async (id: string) => {
    const response = await axios.get(`http://localhost:5000/collections/${id}`);
    return response.data;
};



