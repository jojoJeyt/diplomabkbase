import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { assignManager, finishTicket, getListByManager, getManagerList, getServiceAdminList, removeTicket, updateTicket } from '../api/api';

export const getAdminListAsync = createAsyncThunk(
  'admin/fetchAll',
  async () => {
    const { data } = await getServiceAdminList();

    return {
      clientList: data.map((i) => {
        return {
          ...i,
          count: i.tasks.length,
        }
      }),
      userList: data
      .map(({ tasks, ...restInfo }) => tasks.map((i) => ({...i, ...restInfo, taskId: i._id })))
      .reduce((accum, item) => { accum = accum.concat(item);  return accum }, [])
      .sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
      }),
    }
    }
);


export const getManagerListAsync = createAsyncThunk(
  'admin/managers',
  async (_, thunkAPI) => {
    const { data } = await getManagerList();

    const userList = thunkAPI.getState().admin.userList;

    console.log(userList, data);

    return data.map((manager) => {

      return {
        ...manager,
        countActive: userList.filter(({ managerId, status }) => managerId === manager._id && status === 'ACTIVE').length,
      }
    });
  }
);

export const fetchData = createAsyncThunk(
  'admin/fetchData',
  async (_, thunkAPI) => {

    await thunkAPI.dispatch(getAdminListAsync());
    await thunkAPI.dispatch(getManagerListAsync());


    return null;
  }
);

export const getListByManagerAsync = createAsyncThunk(
  'admin/list-manager',
  async (_, thunkAPI) => {
    const { data } = await getListByManager(thunkAPI.getState().ui.user._id);


    return  data
    .map(({ tasks, ...restInfo }) => tasks.map((i) => ({...i, ...restInfo, taskId: i._id })))
    .reduce((accum, item) => { accum = accum.concat(item);  return accum }, [])
    .sort((a,b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
);

export const finishTicketAsync = createAsyncThunk(
  'admin/close-ticket',
  async ({ ticketId }, thunkAPI) => {
    const { data } = await finishTicket(thunkAPI.getState().ui.user._id, ticketId);

    thunkAPI.dispatch(getListByManagerAsync());

    return data;
  }
);

export const assignManagerAsync = createAsyncThunk(
  'admin/assign-manager',
  async (formData, thunkAPI) => {
    const { data } = await assignManager(formData);

    thunkAPI.dispatch(fetchData());

    return data;
  }
);

export const removeTicketAsync = createAsyncThunk(
  'admin/remove-ticket',
  async ({ ticketId }, thunkAPI) => {
    const { data } = await removeTicket(ticketId);

    thunkAPI.dispatch(fetchData());

    return data;
  }
);

export const updateTicketAsync = createAsyncThunk(
  'admin/update-ticket',
  async ({ formData, ticketId, userId }, thunkAPI) => {
    const { data } = await updateTicket(ticketId, formData, userId);

    thunkAPI.dispatch(fetchData());

    return data;
  }
);


const initialState = {
  userList: [],
  managers: [],
  clientList: [],
};

export const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManagerListAsync.fulfilled, (state, action) => {
        state.managers = action.payload;
      })
      .addCase(getListByManagerAsync.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(getAdminListAsync.fulfilled, (state, action) => {
        state.userList = action.payload.userList;
        state.clientList = action.payload.clientList;
      });
  },
});
export const selectAdmin = (state) => state.admin;

export const adminReducers =  adminReducer.reducer;
