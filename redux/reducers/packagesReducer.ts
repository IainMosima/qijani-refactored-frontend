import { PackageStructure } from "@/models/package";
import { fetchPackages } from "@/network/package";
import { Dispatch } from "@reduxjs/toolkit";
import { Reducer } from "redux";

interface PackagesAction {
  type: string;
  payload: PackageStructure[];
}

const packagesReducer: Reducer<PackageStructure[], PackagesAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case "fetch":
      return action.payload;
    default:
      return state;
  }
};

export default packagesReducer;

export async function getMyPackages(dispatch: Dispatch<PackagesAction>) {
  const res = await fetchPackages();
  dispatch({ type: "fetch", payload: res });
}
