import { combineReducers } from 'redux';

import budget from './budget.reducers';
import common from './common.reducer';

const rootReducer = combineReducers({
    budget, common
});

export default rootReducer;