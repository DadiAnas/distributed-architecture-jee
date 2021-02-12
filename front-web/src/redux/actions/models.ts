import {CompteopsApi,ClientApi} from "../../api";
import { Model } from "../types";
import { Modal } from "antd";
import ErrorModal from "../../components/ErrorModal";


export const FETCH_ALL = "FETCH_ALL";

export const fetchAll = (model: Model, query: string = "") => {
  return (dispatch: any) => {
    if(model == 'operations'){
      CompteopsApi
      .get(`/${model}?${query}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        
          console.log(response);
          dispatch({ type: FETCH_ALL, payload: { model, data: response.data._embedded.operations } });
      })
      .catch((err) => {
        console.error(`Fetch All ${model} error:\n`, err);
        ErrorModal(err);
      });
    }
    else if(model == 'clients'){
      ClientApi
      .get(`/${model}?${query}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        
          console.log(response);
          dispatch({ type: FETCH_ALL, payload: { model, data: response.data._embedded.clients } });
      })
      .catch((err) => {
        console.error(`Fetch All ${model} error:\n`, err);
        ErrorModal(err);
      });
    }
    else if(model == 'comptes'){
      CompteopsApi
      .get(`/${model}?${query}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        
          console.log(response);
          dispatch({ type: FETCH_ALL, payload: { model, data: response.data._embedded.comptes } });
      })
      .catch((err) => {
        console.error(`Fetch All ${model} error:\n`, err);
        ErrorModal(err);
      });
 
    }
  };
};

export const ADD_ONE = "ADD_ONE";

export const addOne = (model: Model, data: any) => {
  
  return (dispatch: any) => {
    if(model == 'clients') 
      ClientApi
      .post(`/${model}`, data)
      .then((response) => {
        console.log(response);
        dispatch({ type: ADD_ONE, payload: { model, data: response.data } });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      })
    
    else if(model == 'comptes' || model == 'operations')
    CompteopsApi
      .post(`/${model}`, data)
      .then((response) => {
        console.log(response);
        dispatch({ type: ADD_ONE, payload: { model, data: response.data } });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      });
  };
};

export const EDIT_ONE = "EDIT_ONE";

export const editOne = (model: Model, id: number, data: any) => {
  return (dispatch: any) => {
    if(model == 'clients') 
    ClientApi
      .patch(`/${model}/${id}`, data)
      .then((response) => {
        console.log(response);
        dispatch({
          type: EDIT_ONE,
          payload: { model, id, data: response.data },
        });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      })
      else 
      CompteopsApi
      .patch(`/${model}/${id}`, data)
      .then((response) => {
        console.log(response);
        dispatch({
          type: EDIT_ONE,
          payload: { model, id, data: response.data },
        });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      })
  };
};

export const DELETE_ONE = "DELETE_ONE";

export const deleteOne = (model: Model, id: number) => {
  return (dispatch: any) => {
    if(model=="clients")
    ClientApi
      .delete(`/${model}/${id}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: DELETE_ONE, payload: { model, id } });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      })
      else 
      CompteopsApi
      .delete(`/${model}/${id}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: DELETE_ONE, payload: { model, id } });
      })
      .catch((err) => {
        console.error(err);
        ErrorModal(err);
      })
  };
};
