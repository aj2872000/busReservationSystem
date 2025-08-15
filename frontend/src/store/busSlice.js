import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
  name: "bus",
  initialState: {
    buses: [],
    bookings: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchBusesRequest: (state) => { state.loading = true; },
    fetchBusesSuccess: (state, action) => { state.loading = false; state.buses = action.payload; },
    fetchBusesFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    fetchBookingsRequest: (state) => { state.loading = true; },
    fetchBookingsSuccess: (state, action) => { state.loading = false; state.bookings = action.payload; },
    fetchBookingsFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    bookTicketRequest: (state) => { state.loading = true; },
    bookTicketSuccess: (state) => { state.loading = false; },
    bookTicketFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    cancelTicketRequest: (state) => { state.loading = true; },
    cancelTicketSuccess: (state) => { state.loading = false; },
    cancelTicketFailure: (state, action) => { state.loading = false; state.error = action.payload; }
  }
});

export const {
  fetchBusesRequest, fetchBusesSuccess, fetchBusesFailure,
  fetchBookingsRequest, fetchBookingsSuccess, fetchBookingsFailure,
  bookTicketRequest, bookTicketSuccess, bookTicketFailure,
  cancelTicketRequest, cancelTicketSuccess, cancelTicketFailure
} = busSlice.actions;

export default busSlice.reducer;
