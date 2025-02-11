

/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, AxiosResponse } from "axios";
import { MonthlySummaryItem } from "../models/MonthlySummaryItem";
import { TaskItem, TaskItemFormValues } from "../models/TaskItem";
import { Project } from "../models/Project";
import { Hidta } from "../models/Hidta";
import { Requestor } from "../models/Requestor";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => { return new Promise(resolve => setTimeout(resolve, delay)) }


axios.interceptors.request.use(async config => {
    // await sleep(500);
    return config
});

axios.interceptors.response.use(async response => {
    if (import.meta.env.DEV) await sleep(1000);
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
    get: async (year: number, month: number, sortBy: string) => await requests.get<TaskItem[]>(`/taskitem?year=${year}&month=${month}&sortBy=${sortBy}`),
    summary: async (year: number) => requests.get<MonthlySummaryItem[]>(`/taskitem/monthlySummary?year=${year}`),
    create: async (taskItem: TaskItem) => await requests.post<TaskItem>('/taskitem/', taskItem),
    update: (taskItem: TaskItemFormValues) => requests.put<TaskItem>(`/taskitem/${taskItem.id}`, taskItem),
    delete: (id: number) => requests.del(`/taskitem/${id}`)
}


const Projects = {
    get: () => requests.get<Project[]>('/project')
};

const Hidtas = {
    get: () => requests.get<Hidta[]>('/hidta')
};

const Requestors = {
    get: (hidtaId: number) => requests.get<Requestor[]>(`/requestor?hidtaId=${hidtaId}`)
}


const agent = {
    TaskItems,
    Projects,
    Hidtas,
    Requestors
};

export default agent;
