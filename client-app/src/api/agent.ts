

/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, AxiosResponse } from "axios";
import { MonthlySummaryItem } from "../models/MonthlySummaryItem";
import { TaskItem } from "../models/TaskItem";
import { Project } from "../models/Project";
import { Hidta } from "../models/Hidta";
import { Requestor } from "../models/Requestor";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => { return new Promise(resolve => setTimeout(resolve, delay)) }


axios.interceptors.request.use(async config => {
    // await sleep(200);
    return config
});

axios.interceptors.response.use(async response => {
    await sleep(600);
    return response;
}, (error: AxiosError) => {

    const { status } = error.response as AxiosResponse;

    switch (status) {
        case 404:
            console.log('Not found')
            break;
    }


});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const TaskItems = {
    get: async (year: number, month: number) => {
        const response = await requests.get<TaskItem[]>(`http://localhost:5000/api/taskitem?year=${year}&month=${month}`);
        return response;
    },
    summary: (year: number) => requests.get<MonthlySummaryItem[]>(`http://localhost:5000/api/taskitem/monthlySummary?year=${year}`),
    create: async (taskItem: TaskItem) => {
        const response = await requests.post('http://localhost:5000/api/taskitem/', taskItem);
        return response as TaskItem;
    },
    update: (taskItem: TaskItem) => requests.put(`http://localhost:5000/api/taskitem/${taskItem.id}`, taskItem),
    delete: (id: number) => requests.del(`http://localhost:5000/api/taskitem/${id}`)
}


const Projects = {
    get: () => requests.get<Project[]>('http://localhost:5000/api/project')
};

const Hidtas = {
    get: () => requests.get<Hidta[]>('http://localhost:5000/api/hidta')
};

const Requestors = {
    get: (hidtaId: number) => requests.get<Requestor[]>(`http://localhost:5000/api/requestor?hidtaId=${hidtaId}`)
}


const agent = {
    TaskItems,
    Projects,
    Hidtas,
    Requestors
};

export default agent;
