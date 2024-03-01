import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async registerNewUser(userData) {
    try {
      let res = await api.post("/auth/register", userData);
      return res.data.token;
    } catch (e) {
      console.error("Error:", e);
      throw e;
    }
  }

  static async loginUser(username, password) {
    try {
      let res = await api.post("/auth/login", { username, password });
      return res.data.json;
    } catch (e) {
      console.error(e);
    }
  }

  static async getUser(username, token) {
    try {
      const res = await api.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (e) {
      console.error("Error getting user", e);
    }
  }

  static async updateUser(username, updates) {
    try {
      let res = await api.patch(`/users/${username}`, { updates });
      return res.data.user;
    } catch (e) {
      console.log("Error updating user:", e);
    }
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await api.get(`/companies/${handle}`);
    return res.data.company;
  }

  static async getAllCompanies() {
    try {
      let res = await api.get("/companies");
      return res.data.companies;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  static async searchCompany(searchQuery) {
    try {
      let res = await api.get("/companies", { params: searchQuery });
      return res.data.companies;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  static async getAllJobs() {
    try {
      let res = await api.get("jobs");
      return res.jobs;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  static async getCompanyJobs(companyName) {
    try {
      let res = await api.get("/jobs", {
        params: { companyName: companyName },
      });
      return res.data.jobs;
    } catch (e) {
      console.error("Error:", e);
    }
  }
}

export default JoblyApi;

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
