import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      disabledButton: true,
      redirect: false,

    };

    this.disabledVerification = this.disabledVerification.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  disabledVerification() {
    const { email, senha } = this.state;
    const minCarac = 6;
    const emailValidation = /\S+@\S+\.\S+/;

    if (emailValidation.test(email) && senha.length >= minCarac) {
      return this.setState({
        disabledButton: false,
      });
    }

    return this.setState({
      disabledButton: true,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value }, this.disabledVerification);
  }

  handleClick() {
    const { loginProps } = this.props;
    const { email } = this.state;
    loginProps(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, senha, disabledButton, redirect } = this.state;
    if (redirect) { return <Redirect to="/carteira" />; }

    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ senha }
          />
        </label>

        <button
          type="button"
          disabled={ disabledButton }
          onClick={ this.handleClick }
        >
          Entrar
        </button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginProps: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  loginProps: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
