import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../re-ducks/rootReducer';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
