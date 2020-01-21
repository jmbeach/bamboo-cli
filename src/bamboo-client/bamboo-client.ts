import axios, {AxiosInstance} from 'axios'
export default class BambooClient {
  username: string;

  password: string;

  serverUrl: string;

  _axios: AxiosInstance;

  constructor(username: string, password: string, serverUrl: string) {
    this.username = username
    this.password = password
    this.serverUrl = serverUrl
    this._axios = axios.create({
      auth: {
        username: this.username,
        password: this.password,
      },
      baseURL: serverUrl,
      headers: {
        accept: 'application/json',
      },
    })
  }

  getAllProjects() {
    return this._axios.get('/rest/api/latest/deploy/project/all.json')
  }

  getCurrentUser() {
    return this._axios.get('/rest/api/latest/currentUser.json')
  }

  getAllPlans() {
    return this._axios.get('/rest/api/latest/plan.json')
  }

  getServerInfo() {
    return this._axios.get('/rest/api/latest/info.json')
  }

  queue(key: string) {
    return this._axios.post(`/rest/api/latest/queue/${key}`)
  }
}
