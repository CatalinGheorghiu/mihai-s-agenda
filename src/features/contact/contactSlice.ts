import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Define a type for the slice state

// Define a type for the slice state
interface ContactState {
    contactId: string | number;
    contactGroup: string;
    contactName: string;
    contactPhoneNumber: string | number;
    contactFile?: string;
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
            const contact = state.find(
                ({ contactId }) => contactId === action.payload.contactId,
            );

            if (contact) {
                contact.contactName = action.payload.contactName;
                contact.contactPhoneNumber = action.payload.contactPhoneNumber;
                contact.contactGroup = action.payload.contactGroup;
                contact.contactFile = action.payload.contactFile;
            }
        },
    },
});

export const { createContact, updateContact } = contactSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectContact = (state: RootState) => state.contact.name;

export default contactSlice.reducer;
