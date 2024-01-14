import axios from "axios";

class ApiService {
  constructor() {
    // this.baseUrl = "http://localhost:9000/api";
    this.baseUrl = "https://us-central1-planetpulse-b2400.cloudfunctions.net/api";
    this.headers = { authorization: `Bearer ${localStorage.getItem("token")}` };
  }
  login(data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/admin/login`, data)
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response?.data));
    });
  }
  get(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}${endpoint}`, { headers: this.headers })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
  post(endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}${endpoint}`, data, { headers: this.headers })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
  postWithDocument(endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}${endpoint}`, data, {
          headers: { ...this.headers, "Content-Type": "multipart/form-data" },
        })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
  delete(endpoint) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseUrl}${endpoint}`, { headers: this.headers })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
  put(endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}${endpoint}`, data, { headers: this.headers })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
  putWithDocument(endpoint, data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}${endpoint}`, data, {
          headers: { ...this.headers, "Content-Type": "multipart/form-data" },
        })
        .then((res) => resolve(res.data))
        .catch((er) => reject(er.response));
    });
  }
}

export default new ApiService();
