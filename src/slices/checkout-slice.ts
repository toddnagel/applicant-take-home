import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    isProcessing: boolean;
    loading: boolean;
    view: ViewEnum;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isCollapsedCheckoutPanelOpen: false,
    isProcessing: false,
    loading: false,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsProcessing(state) {
            state.isProcessing = !state.isProcessing;
        },
    },
});

export const { setCheckoutView, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading, toggleIsProcessing } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectIsProcessing = ({ checkout: { isProcessing } }: RootState): boolean => isProcessing;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;
