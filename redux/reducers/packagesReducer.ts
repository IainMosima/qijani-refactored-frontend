import { PackageStructure } from "@/models/package";
import { fetchPackages } from "@/network/package";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reducer } from "redux";


const initialState: PackageStructure[] = []

const packagesReducerSlice = createSlice({
  name: 'packagesReducerSlice',
  initialState,
  reducers: {
    setMypackages: (state, action: PayloadAction<PackageStructure[]>) => {
      return [...action.payload];
    }
  }

})

export const getMyPackages = (token: string) => async (dispatch: Dispatch) => {
  try {
    const response = await fetchPackages(token);
    dispatch(setMypackages(response));
  } catch (err) {
    console.error(err);
    alert('Something went wrong, please refresh the page');
  }
};

export const { setMypackages } = packagesReducerSlice.actions;
export default packagesReducerSlice.reducer;