import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { Project } from "../models/Project";
import { Hidta } from "../models/Hidta";
import { TaskItem, TaskItemFormValues } from "../models/TaskItem";
import agent from "../api/agent";
import { RootState } from "../store/store";

// type AsyncThunkConfig = {
//     /** return type for `thunkApi.getState` */
//     state?: unknown
//     /** type for `thunkApi.dispatch` */
//     dispatch?: Dispatch
//     /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
//     extra?: unknown
//     /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
//     rejectValue?: unknown
//     /** return type of the `serializeError` option callback */
//     serializedErrorType?: unknown
//     /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
//     pendingMeta?: unknown
//     /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
//     fulfilledMeta?: unknown
//     /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
//     rejectedMeta?: unknown
// }

export type LogState = {
    projects: Project[],
    hidtas: Hidta[],
    requestors: { value: string; text: string }[],
    tasks: TaskItem[],
    isLoading: boolean
};

const initialState: LogState = {
    projects: [],
    hidtas: [],
    requestors: [],
    tasks: [],
    isLoading: false
};


export const addItem = createAsyncThunk(
    'log/addItem',
    async function (values: string, thunkApi) {

        const taskItem = JSON.parse(values) as TaskItemFormValues;
        const shapedTask =
            taskItem.requestorName?.trim() !== ''
                ? {
                    ...taskItem,
                    requestorName: '',
                    requestor: {
                        firstName: taskItem.requestorName?.split(' ')[0],
                        lastName: taskItem.requestorName?.split(' ')[1],
                        email: taskItem.requestorEmail,
                    },
                }
                : {
                    ...taskItem,
                    requestorName: '',
                };

        const response = await agent.TaskItems.create(shapedTask);

        const logState = thunkApi.getState() as RootState
        const hidtas = logState.log.hidtas;
        const projects = logState.log.projects;

        const newTask: TaskItem = {
            ...taskItem,
            id: response.id,
            requestorId: response.requestorId,
            hidta: hidtas.find((x) => x.id == response.hidtaId)?.name,
            project: projects.find((x) => x.id == response.projectId)?.name,
            requestorName: response.requestorName,
        };

        return newTask;
    }
);



export const logSlice = createSlice({
    name: 'logSlice',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setHidtas: (state, action) => {
            state.hidtas = action.payload;
        },
        setRequestors: (state, action) => {
            state.requestors = action.payload;
        },
        setIsLoadingTasks: (state, action) => {
            state.isLoading = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.pending, (state, action) => {
                //state.value = action.payload;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.tasks = [...state.tasks, action.payload];

            });
    }
})


//async function createTask(values: TaskItemFormValues) {
// const shapedTask =
//     values.requestorName?.trim() !== ''
//         ? {
//             ...values,
//             requestorName: '',
//             requestor: {
//                 firstName: values.requestorName?.split(' ')[0],
//                 lastName: values.requestorName?.split(' ')[1],
//                 email: values.requestorEmail,
//             },
//         }
//         : {
//             ...values,
//             requestorName: '',
//         };

// const response = await agent.TaskItems.create(shapedTask);

// const newTask: TaskItem = {
//     ...values,
//     id: response.id,
//     requestorId: response.requestorId,
//     hidta: hidtas.find((x) => x.id == response.hidtaId)?.name,
//     project: projects.find((x) => x.id == response.projectId)?.name,
//     requestorName: response.requestorName,
// };

//setSortedTasks([...tasks, newTask]);
//}

//   async function updateTask(values: TaskItemFormValues) {
//     try {
//       if (values.requestorId <= -1) {
//         values.requestorId = 0;
//       }

//       const updatedTask = {
//         ...values,
//         hidtaId: +values.hidtaId,
//         projectId: +values.projectId,
//       };

//       const response = await agent.TaskItems.update(updatedTask);

//       const taskItem = {
//         ...new TaskItem(values),
//         hidta: hidtas.find((x) => x.id == +values.hidtaId)?.name,
//         project: projects.find((x) => x.id == +values.projectId)?.name,
//         requestorId: response.requestorId,
//         requestorName: response.requestorName,
//       };

//       const existingTasks = [...tasks.filter((t) => t.id !== values.id)];
//       existingTasks.push(taskItem);

//     //   setSortedTasks(existingTasks);
//     } catch (error) {
//       console.log(error);
//     }
//   }


export const { setProjects, setHidtas, setRequestors, setTasks, setIsLoadingTasks } = logSlice.actions;


export default logSlice.reducer;