import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../Components/ExpenseForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brl: 'BRL',
    };
    this.sum = this.sum.bind(this);
  }

  sum() {
    const { walletUser } = this.props;
    const total = walletUser.reduce((acc, curr) => (
      acc + (Number(curr.value) * curr.exchangeRates[curr.currency].ask)
    ), 0);
    return total.toFixed(2);
  }

  render() {
    const { emailUser } = this.props;
    const { brl } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">
            {`Email: ${emailUser}`}
          </p>
          <p data-testid="total-field">
            {' '}
            {`Total: ${this.sum()}`}
          </p>
          <p data-testid="header-currency-field">
            {brl}
          </p>
        </header>
        <ExpenseForm />

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  walletUser: state.wallet.expenses,
});

Wallet.propTypes = {
  emailUser: PropTypes.func.isRequired,
  walletUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
