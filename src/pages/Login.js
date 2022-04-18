import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser } from '../actions';
import logo from '../images/pato.jpeg';
import wallet from '../images/wallet.svg';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      disabledButton: true,
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
    const { loginProps, history } = this.props;
    const { email } = this.state;
    loginProps(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, disabledButton } = this.state;

    return (
      <>
        <img src={ logo } alt="logos" className="imagem" />
        <img src={ wallet } alt="logos" className="wallet" />
        <form className="form">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              className="email"
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
              className="senha"
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabledButton }
              onClick={ this.handleClick }
              className="buttonLogin"
            >
              Entrar
            </button>
          </Link>

        </form>

      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginProps: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  loginProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
