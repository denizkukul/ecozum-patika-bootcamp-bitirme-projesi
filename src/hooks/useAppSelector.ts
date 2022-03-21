import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../store/store';

// Typed useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;