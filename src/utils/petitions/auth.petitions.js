import axios from 'axios';
import { HEADERS } from './petitions.constants';

const authHTTPObject = axios.create({
  baseURL: 'http://173.255.216.213:3000/api/v1/',
});

const auth = {
  signup(userInfo = {}) {
    return authHTTPObject.post('signup', userInfo, { headers: HEADERS }).then((response) => response.data.data);
  },
  login(loginInfo = {}) {
    return authHTTPObject.post('login', loginInfo, { headers: HEADERS }).then((response) => response.data.data);
  },
};

export default auth;
