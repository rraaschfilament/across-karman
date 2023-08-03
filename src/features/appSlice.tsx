import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    activeId: string;
    hoveringId: string;
    flyToId: string;
    currentStaticImg: string;
    isSplashScreen: boolean;
    earthOrbitsScale: number;
  }

const initialState: AppState = {
  activeId: "",
  hoveringId: "",
  flyToId: "",
  currentStaticImg: "",
  isSplashScreen: true,
  earthOrbitsScale: 1,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<string>) {
      state.activeId = action.payload;
    },
    setHoveringId(state, action: PayloadAction<string>) {
      state.hoveringId = action.payload;
    },
    setFlyToId(state, action: PayloadAction<string>) {
      state.flyToId = action.payload;
    },
    setCurrentStaticImg(state, action: PayloadAction<string>) {
        state.currentStaticImg = action.payload;
    },
    setIsSplashScreen(state, action: PayloadAction<boolean>) {
        state.isSplashScreen = action.payload;
        },
    setEarthOrbitsScale(state, action: PayloadAction<number>) {
        state.earthOrbitsScale = action.payload;
        }
  },
});

export const { setActiveId, setHoveringId, setFlyToId, setCurrentStaticImg, setIsSplashScreen, setEarthOrbitsScale} = appSlice.actions;

export default appSlice.reducer;
