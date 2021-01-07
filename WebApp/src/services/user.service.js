import axios from 'axios';
import authHeader from './auth-header';

const apiurl = 'http://localhost:8001/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(apiurl + 'all');
  }

  updateUser(id,prefArray){
    return axios.put("http://localhost:8001/api/user/update",{"id":id,"preferences":prefArray})
  }

  getUserBoard() {
    return axios.get(apiurl + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(apiurl + 'admin', { headers: authHeader() });
  }
}

export default new UserService();