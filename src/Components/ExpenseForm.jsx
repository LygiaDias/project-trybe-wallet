import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { exchangeAPI } from '../actions';
import InputSelect from './InputSelect';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,

    });
  }

  render() {
    const { value, description } = this.state;
    const { walletUser } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
            type="number"
            name="value"
            id="value"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
            type="text"
            name="description"
            id="description"
          />
        </label>
        <InputSelect onChangeFunction={ this.handleChange } state={ { ...this.state } } />
        <button
          type="button"
          onClick={ () => {
            walletUser({ ...this.state });
            this.setState({
              value: '',
              description: '',
            });
          } }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispach) => ({
  walletUser: (payload) => dispach(exchangeAPI(payload)),
});

ExpenseForm.propTypes = {

  walletUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(ExpenseForm);
