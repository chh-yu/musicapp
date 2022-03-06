import axios from "axios"
import {extend} from "@/utils/util.js"

const HOST = "http://39.99.55.31:3000"
// const HOST = "http://localhost:8080"

function post(url, data={}){
    var options = {
        url: HOST+url,
        method: "post",
        withCredentials: true
    }
    options = extend(true, options, {data})
    // console.log("options", options)
    return axios(options)
}
function get(url, data={}){
    var options = {
        url: HOST+url,
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