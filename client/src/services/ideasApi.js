import axios from 'axios';

class IdeasApi{
    constructor() {
        this._apiURL = 'http://localhost:5000/api/ideas';
    };
    // get the ideas
    getIdeas() {
        return axios.get(this._apiURL);
    };
    // create an idea
    createIdea(data) {
        return axios.post(this._apiURL, data)
    };
    // update an idea
    updateIdea(id, data) {
        return axios.put(`${this._apiURL}/${id}`, data);
    };
    // delete an idea
    deleteIdea(id) {
        // get the username to validate
        const username = localStorage.getItem('username') || '';
        
        return axios.delete(`${this._apiURL}/${id}`, {
            data: {
                username,
            },
        });
    };
};

export default new IdeasApi();