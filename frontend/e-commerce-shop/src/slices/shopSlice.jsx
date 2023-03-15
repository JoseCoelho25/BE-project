import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shopService from '../services/shopService';

export const fetchAllProducts = createAsyncThunk(
  'shop/fetchAllProducts',
  async () => {
    const response = await shopService.getAllProducts();
    return response.data;
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add any other reducers you may need
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = shopSlice.actions;
export default shopSlice.reducer;
