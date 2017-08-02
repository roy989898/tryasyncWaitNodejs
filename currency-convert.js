// USD CAD 23
// 23 USD is wprth 28 CAD.

const axios = require('axios');

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://api.fixer.io/latest?base=' + from);
    return response.data.rates[to];

};

const getCountries = async (currencyCode) => {
    const res = await axios.get('https://restcountries.eu/rest/v2/currency/' + currencyCode);
    return res.data.map((country) => {
        return country.name;
    });
};


const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return amount + from + ' is worth ' + exchangedAmount + to + ' can be us at below ' +
            countries.join(',');
    });
};


const convertCurrencyAlt = async (from, to, amount) => {
    let countries = await getCountries(to);
    let exchangeRate = await getExchangeRate(from, to);
    let exchangedAmount = amount * exchangeRate;

    return amount + from + ' is worth ' + exchangedAmount + to + ' can be us at below ' +
        countries.join(',');
};

convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
    console.log(status);
});

/* getCountries('CAD').then((countries) => {
    console.log(countries);
}); */

/* getExchangeRate('USD', 'EUR').then((rate) => {
    console.log(rate);
}); */