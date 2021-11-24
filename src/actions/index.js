export const EMAIL = 'EMAIL';
export const EXPENSE = 'EXPENSE';
export const DELETE = 'DELETE';

export const loginUser = (payload) => (
  {
    type: EMAIL,
    payload,
  });

export const expenceUser = (payload) => (
  {
    type: EXPENSE,
    payload,
  });

export const exchangeAPI = (payload) => async (dispach) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  dispach(expenceUser({ ...payload, exchangeRates: json }));
};

export const deleteExpense = (id) => (
  {
    type: DELETE,
    id,
  });
