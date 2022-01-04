import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmail } from "../../components/inbox/InboxContainer";
import { RootState, AppThunk } from "../index";

export interface InboxState {
  emails: IEmail[] | null;
}

export const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    emails: [],
  },
  reducers: {
    storeEmails: (state, action) => {
      state.emails = action.payload;
    },
  },
});

export const { storeEmails } = inboxSlice.actions;

export default inboxSlice.reducer;
