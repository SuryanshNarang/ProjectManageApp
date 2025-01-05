// we will be doing our reduxjs setup here.
// since we want a dark mode and sidebar collapse feature to be accesible everywhere we will be making two Different states within this.
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}
const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // This says: when we set our isSidebarCollapsed in actionPayload this is going to be the value for this particluar function
    //think setIsSidebarCollapsed as a function that changes our state
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});
// here we pass the functions we defined in the reducer
export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
