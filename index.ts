import express, { response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import qs from 'qs';
const app = express();
const PORT = 5000;

const API_KEY = "pk_208b492bf7ccdc0645c783e60799dfc9b3";
const baseUrl = "https://a.klaviyo.com/api/";

interface reponseTypeList {
    updated: string,
    name: string,
    created: string,
    object: string,
    id: string,
    integration: object
}

function getApikey() {
    app.get('/getApikey', (req, res) => {
        res.redirect("https://www.klaviyo.com/account#api-keys-tab"); // take api key as input and store it in variable to send it as query parameter
    });
}

const getList = async (): Promise<reponseTypeList[]> => {
    const response = await axios.get(`${baseUrl}v2/lists`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

// const all_List = getList();

const getListMembers = async (listId: string) => {
    const response = await axios.get(`${baseUrl}v2/group/${listId}/members/all`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

//const member = getListMembers("VqsqHE") ;

async function getProfile(id: string) {
    const response = await axios.get(`${baseUrl}v1/person/${id}`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

//getProfile("01EJQRA1DYF6G63GKW4EA5SF4T");
// Metrics API



const getMetrics = async () => {
    const response = await axios.get(`${baseUrl}v1/metrics`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

//const metrics = getMetrics();

const getMetricsTimeline = async () => {
    const response = await axios.get(`${baseUrl}v1/metrics/timeline`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

//getMetricsTimeline();

const particularMetricTimeline = async (id: string) => {
    const response = await axios.get(`${baseUrl}v1/metric/${id}/timeline`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}
//particularMetricTimeline("QVnzXH");

// export data from  

const exportMetric = async (id: string) => {
    const response = await axios.get(`${baseUrl}v1/metric/${id}/export`, {
        params: {
            api_key: API_KEY // It include some optional filtering params start_date, end_date, unit, measurement, where ,by ,count
        }
    });
    console.log(response.data)
    return response.data
}

// exportMetric("UhDQ2F");

// Campaign

const getAllCampaigns = async () => {
    const response = await axios.get(`${baseUrl}v1/campaigns`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

// getAllCampaigns();

const createCampaign = async (listid: string, templateId: string, email: string, senderName: string, subject: string, name: String) => {
    var formData = new FormData();

    formData.append("list_id", listid);
    formData.append("template_id", templateId);
    formData.append("from_email", email);
    formData.append("from_name", senderName);
    formData.append("subject", subject);
    formData.append("name", name);

    const formHeader = formData.getHeaders()

    const response = await axios.post(baseUrl + 'v1/campaigns', formData, {
        params: {
            api_key: 'pk_208b492bf7ccdc0645c783e60799dfc9b3',

        },
        headers: {
            ...formHeader
        }
    })

    console.log(response.data)
    return response.data
}

//createCampaign();

const getCampaignById = async (id: string) => {
    const response = await axios.get(`${baseUrl}v1/campaign/${id}`, {
        params: {
            api_key: API_KEY
        }
    });
    console.log(response.data)
    return response.data
}

//getCampaignById("UsMhab");

const updatecampaign = async (id: string) => {
    const response = await axios.put(`${baseUrl}v1/campaign/${id}`, qs.stringify({ subject: 'qwerty' }), {
        params: {
            api_key: API_KEY,
            // we can send following params(list_id,template_id,from_email,from_name,subject,use_smart_sending,add_google_analytics)
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    console.log(response.data)
    return response.data
}

//updatecampaign("UsMhab");

const sendCampaign = async (id: String) => {
    const response = await axios.post(`${baseUrl}v1/campaign/${id}/send`, null,{
        params: {
            api_key: API_KEY
        }
    }).then(response=>{
        console.log(response)
    }).catch(
        response=>{
            console.log(response)
        }
    );
    console.log(response)
    return response
}

//sendCampaign("TaHbWu");

const scheduleCampaign = async (id:string)=>{
    const response = await axios.post(`${baseUrl}v1/campaign/${id}/schedule`, qs.stringify({send_time:"2020-09-23 00:00:00"}),{
        params: {
            api_key: API_KEY
        }
    }).then(response=>{
        console.log(response)
    }).catch(
        response=>{
            console.log(response)
        }
    );
    console.log(response)
    return response
}

// scheduleCampaign("TaHbWu");

const cancelCampaign = async (id: string) => {
    const response = await axios.post(`${baseUrl}v1/campaign/${id}/cancel`,null, {
        params: {
            api_key: API_KEY
        }
    }).then(response=>{
        console.log(response)
    }).catch(
        response=>{
            console.log(response)
        }
    );
    console.log(response)
    return response
}

//cancelCampaign("TaHbWu")

const cloneCampaign = async (id: string) => {
    const response = await axios.post(`${baseUrl}v1/campaign/${id}/clone`,qs.stringify({name:"Cloned Campaign",list_id:"VqsqHE"}), {
        params: {
            api_key: API_KEY
        }
    }).then(response=>{
        console.log(response)
    }).catch(
        response=>{
            console.log(response)
        }
    );
    console.log(response)
    return response
}

//cloneCampaign("VERVdZ");

const campaignSummary = async (id: string) => {
    const response = await axios.get(`${baseUrl}v1/campaign/${id}/recipients`, {
        params: {
            api_key: API_KEY,
            count:5,
            sort:"asc"
            //count: 5,//no of campaign u want to fetch optional
            //sort: "asc or desc.",
            //offset: "optional, For pagination, if a response to this endpoint includes a next_offset, use that value to get the next page of recipients."
        }
    }).then(response=>{
        console.log(response)
    }).catch(
        response=>{
            console.log(response)
        }
    );
    console.log(response)
    return response;
}

campaignSummary("UsMhab");