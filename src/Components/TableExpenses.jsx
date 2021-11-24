import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableExpenses extends React.Component {
  render() {
    const { expenses, deleteLine } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map(({ description, id, tag, method,
          currency, exchangeRates, value }) => {
          const { name, ask } = exchangeRates[currency];
          return (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(value) * Number(ask)).toFixed(2)}</td>
                <td> Real </td>
                <td>
                  {' '}
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteLine(id) }
                  >
                    Excluir
                  </button>

                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispachToProps = (dispatch) => ({
  deleteLine: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispachToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteLine: PropTypes.func.isRequired,
};
