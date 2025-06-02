import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DivisionsFilterState {
  searchQuery: string;
  militaryDistrict: string;
  sortBy: 'name' | 'id';
}

const initialState: DivisionsFilterState = {
  searchQuery: '',
  militaryDistrict: 'all',
  sortBy: 'name',
};

const divisionsFilterSlice = createSlice({
  name: 'divisionsFilter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setMilitaryDistrict: (state, action: PayloadAction<string>) => {
      state.militaryDistrict = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'id'>) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchQuery,
  setMilitaryDistrict,
  setSortBy,
  resetFilters,
} = divisionsFilterSlice.actions;

export default divisionsFilterSlice.reducer;