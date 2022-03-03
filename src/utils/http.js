import axios from "axios"
import {extend} from "@/utils/util.js"

const server = "http://39.99.55.31:3000"
// const server = "http://localhost:8080"

function post(url, data={}){
    var options = {
        url: server+url,
        method: "post",
        withCredentials: true
    }
    options = extend(true, options, {data})
    // console.log("options", options)
    return axios(options)
}
function get(url, data={}){
    var options = {
        url: server+url,
        method: "get"
    }
    options = extend(true, options, {data})
    // console.log("options", options)
    return axios(options)
}
export default{
    post,
    get
}