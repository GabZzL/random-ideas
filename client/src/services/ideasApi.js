import axios from 'axios';

class IdeasApi{
    constructor() {
        this._apiURL = 'http://localhost:5000/api/ideas';
    };

    getIdeas() {
        return axios.get(this._apiURL);
    };
};

export default new IdeasApi();