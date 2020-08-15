import Axios from "axios";

export default Axios.create({
    baseURL:"https://api.jdoodle.com/v1/",
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Max-Age': 86400,
         'Content-Type': 'application/json'
    }
});

