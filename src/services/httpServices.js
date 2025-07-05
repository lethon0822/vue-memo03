import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/green';

class HttpService {
    async save(item) {
        const res = await axios.post('/memo', item);
        return res.data;
    }

    async findAll(params){
        const res = await axios.get('/memo', {params})
        return res.data;
    }

    async findById(id){
        const res = await axios.get(`/memo/${id}`);
        return res.data;
    }

    async modify(item){
        const res = await axios.put('/memo', item);
        return res.data;
    }

    async deleteById(id){
        const res = await axios.delete(`/memo?id=${id}`)
        return res.data;
    }
}

export default new HttpService();