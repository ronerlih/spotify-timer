import axios from "axios";
import btoa from "btoa";

module.exports = function () {
    const response_type='code'
    const client_id='c65e18eaba174af19b7b2264abf0cfff'
    const client_secret='4b4ef9258d244d329fa1820788291504'
    const redirect_uri='http://localhost:8888/'
    const state='ABCDEFGHIJKLMNOP'
    const b64Credentials = btoa('c65e18eaba174af19b7b2264abf0cfff:4b4ef9258d244d329fa1820788291504')
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: params,
        headers: {Authorization: 'Basic ' + b64Credentials}
    });

    }