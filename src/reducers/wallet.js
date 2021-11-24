// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSE, DELETE } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
};

function reducerWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }] };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((curr) => curr.id !== action.id),
    };
  default:
    return state;
  }
}

export default reducerWallet;
