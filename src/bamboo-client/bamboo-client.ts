import axios, {AxiosInstance} from 'axios'
export enum ExpandOptions {
  LogEntries
}
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

  deploy(environmentId: string, versionId: string) {
    return this._axios.post(`/rest/api/latest/queue/deployment/?environmentId=${environmentId}&versionId=${versionId}`, {})
  }

  getAllPlans() {
    return this._axios.get('/rest/api/latest/plan.json')
  }

  getAllProjects() {
    return this._axios.get('/rest/api/latest/deploy/project/all.json')
  }

  getBuilds(planKey: string | null = null, buildNumber: string | null = null) {
    let url = '/rest/api/latest/result'
    if (planKey) {
      url = `${url}/${planKey}/${buildNumber}`
    }

    return this._axios.get(url)
  }

  getBuildLog(planKey: string, buildNumber: string, expand: ExpandOptions[] | null = null) {
    let url = `/rest/api/latest/result/${planKey}-JOB1-${buildNumber}`

    if (expand) {
      url = `${url}?expand=`
      for (const option of expand) {
        url += this.getUrlExpandOptionParam(option)
      }

      url += '&max-results=10000'
    }

    return this._axios.get(encodeURI(url))
  }

  getCurrentUser() {
    return this._axios.get('/rest/api/latest/currentUser.json')
  }

  getReleases(projectId: string) {
    return this._axios.get(`/rest/api/latest/deploy/project/${projectId}/versions`)
  }

  getServerInfo() {
    return this._axios.get('/rest/api/latest/info.json')
  }

  getUrlExpandOptionParam(option: ExpandOptions) {
    switch (option) {
    case ExpandOptions.LogEntries:
      return 'logEntries'
    default:
      throw new Error(`Expand option ${option} unrecognized`)
    }
  }

  queue(key: string) {
    return this._axios.post(`/rest/api/latest/queue/${key}`)
  }
}
