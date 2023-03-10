import axios from "axios";
import React from "react";



export const ApiCaller = (id) => {
 // const BASE_URL = `https://plankton-app-ovujs.ondigitalocean.app/routes/allmenucustomer?id=${id}`;

 

  return axios.get(`https://plankton-app-ovujs.ondigitalocean.app/routes/allmenucustomer?id=${id}`);
 
};

export default ApiCaller;
