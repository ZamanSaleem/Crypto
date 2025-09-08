import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchallcoin = createAsyncThunk(
    "coins/fetchAllCoin",
    async(currency,{rejectWithValue }) => {
        try {
            const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-nVxv53XhUaGQ6TjGJL8qZLjs",
        },
      };

      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&include_tokens=top`, options)

      return await res.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const coinSlice =  createSlice({
    name: "coin",
    initialState: {
        allCoin: [],
    currency: { name: "usd", symbol: "$" },
    loading: false,
    error: null,
    },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchallcoin.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(fetchallcoin.fulfilled, (state, action) => {
        state.loading = false;
        state.allCoin = action.payload;
      })
      .addCase(fetchallcoin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export const {setCurrency} = coinSlice.actions;
export default coinSlice.reducer