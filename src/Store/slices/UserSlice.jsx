import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosAPICall } from "../../utils";

// export const showAllUser = createAsyncThunk("showAllUser", async () => {
//     try {
//         const response = await axios("https://crudcrud.com/api/225577ad9ba5474ca129cd9448e571f6/users");
//         // console.log(response);
//         if (response.status == 200) {
//             console.log("Response Data ==> : ", response.data);
//             return response.data;
//         }
//     } catch (error) {
//         console.log(error);
//     }

// });

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        userData: [
            {
                name: "Prince",
                email: "prince@gmail.com",
                contact_no: "1234567890",
                date_of_birth: "2023-02-14",
                address: "vbjkl"
            },
            {
                name: "ABC",
                email: "ABC@gmail.com",
                contact_no: "1234567890",
                date_of_birth: "2023-04-14",
                address: "Ahmd"
            }
        ],
        isError: false
    },

    // Here We have "reducers"
    reducers: {
        showAllUser(state, action) {
            state.userData = [...action.payload];
        },
        addUser(state, action) {
            state.userData = [...state.userData, action.payload];
        },
        deleteUser(state, action) { },
        updateUser(state, action) { }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(showAllUser.pending, (state, action) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(showAllUser.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.data = action.payload;
    //         // state.data.push(action.payload);
    //         console.log("Action Payload : >> ", action.payload);
    //     });
    //     builder.addCase(showAllUser.rejected, (state, action) => {
    //         state.isError = true;
    //         console.log("Error Payload :>> ", action.payload);
    //     });
    // },

});


export default userSlice.reducer;
export const { showAllUser, addUser, deleteUser, updateUser } = userSlice.actions;
// Here we have only "reducer" not reducers