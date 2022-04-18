import React from 'react';
import PropTypes from 'prop-types';

class InputSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: [],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      payType: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    };
    this.currencyAPI = this.currencyAPI.bind(this);
  }

  componentDidMount() {
    this.currencyAPI();
  }

  async currencyAPI() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    const jsonKeys = Object.keys(json);
    this.setState({
      exchanges: jsonKeys,
    });
  }

  render() {
    const { tags, payType, exchanges } = this.state;
    const { onChangeFunction, state: { currency, method, tag } } = this.props;
    return (
      <div className="div">
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            value={ currency }
            onChange={ (event) => onChangeFunction(event) }
            name="currency"
            id="currency"
            className="moeda"
          >
            {exchanges.map((curr) => (<option key={ curr } value={ curr }>{curr}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            value={ method }
            onChange={ (event) => onChangeFunction(event) }
            name="method"
            id="method"
            className="metodo"
          >
            {payType.map((pay) => (<option key={ pay } value={ pay }>{pay}</option>))}
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            value={ tag }
            onChange={ (event) => onChangeFunction(event) }
            name="tag"
            id="tag"
            className="tag"

          >
            {tags.map((tg) => (<option key={ tg } value={ tg }>{tg}</option>))}
          </select>
        </label>
      </div>
    );
  }
}

InputSelect.propTypes = {
  onChangeFunction: PropTypes.func.isRequired,
  state: PropTypes.shape({
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,

};

export default InputSelect;
