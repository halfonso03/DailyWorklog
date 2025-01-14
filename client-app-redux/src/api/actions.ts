

import { useEffect } from 'react';
import { setHidtas, setIsLoadingTasks, setProjects, setRequestors, setTasks } from '../redux/logSlice';
import { AppDispatch, useAppDispatch } from '../store/store';
import agent from './agent';
import { Hidta } from '../models/Hidta';
import { Requestor } from '../models/Requestor';

export const useFetchHidtas = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    agent.Hidtas.get()
      .then((response) =>
        dispatch(setHidtas(response.map((h: Hidta) => ({ id: h.id, name: h.name }))))
      ).catch((error) => {
        console.log('useFetchHidtas error', error);
      });
  }, [dispatch]);
};

export const useFetchProjects = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    agent.Projects.get()
      .then((response) => {
        dispatch(setProjects(response.map((p) => ({ id: p.id, name: p.name }))));
      })
      .catch((error) => {
        console.log('useFetchProjects error', error);
      });
  }, [dispatch])
};


export const fetchTasks = async (year: number, month: number, dispatch: AppDispatch) => {
  try {

    dispatch(setIsLoadingTasks(true));
    const response = await agent.TaskItems.get(year, month);
    dispatch(setTasks(response));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoadingTasks(false));
  }
}

export const fetchRequestors = async (hidtaId: number, dispatch: AppDispatch) => {
  agent.Requestors.get(hidtaId).then((response: Requestor[]) => {
    const req = response.map((r) => ({
      value: r.id.toString(),
      text: `${r.firstName}  ${r.lastName} (${r.email})`,
    }));
    dispatch(setRequestors(req));
  });
}

// export function fetchRequestorsss(hidtaId: number) {
//   agent.Requestors.get(hidtaId).then((response: Requestor[]) => {
//     const req = response.map((r) => ({
//       value: r.id.toString(),
//       text: `${r.firstName}  ${r.lastName} (${r.email})`,
//     }));
//     dispatch(setRequestors(req));
//   });
// }


export const useFetchRequestors = (hidtaId: number) => {
  //   dispatch({ type: 'FETCH_DATA_REQUEST' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    agent.Requestors.get(hidtaId).then((response: Requestor[]) => {
      const req = response.map((r) => ({
        value: r.id.toString(),
        text: `${r.firstName}  ${r.lastName} (${r.email})`,
      }));
      dispatch(setRequestors(req));
    })
  }, [dispatch, hidtaId]);
}
