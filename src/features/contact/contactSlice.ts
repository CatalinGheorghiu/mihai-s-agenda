import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ContactState {
    contactId: string | number;
    contactFile?: string;
    contactGroup: string;
    contactName: string;
    contactPhoneNumber: string | number;
}

// Define the initial state using that type
const initialState: ContactState[] = [];

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        createContact: (state, action: PayloadAction<ContactState>) => {
            return [...state, action.payload];
        },
        updateContact: (state, action: PayloadAction<ContactState>) => {
            return [...state, action.payload];
        },

        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

export const { createContact } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectContact = (state: RootState) => state.contact.name;

export default contactSlice.reducer;
