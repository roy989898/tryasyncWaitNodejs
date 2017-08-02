// USD CAD 23
// 23 USD is wprth 28 CAD.

const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get('http://api.fixer.io/latest?base=' + from).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get('https://restcountries.eu/rest/v2/currency/' + currencyCode).then((res) => {
        return res.data.map((country) => {
            return country.name;
        });
    });
};


const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return amount + from + ' is worth ' + exchangedAmount + to+' can be us at below '+
        countries.join(',');
    });
};

convertCurrency('CAD', 'USD', 100).then((status) => {
    console.log(status);
});

/* getCountries('CAD').then((countries) => {
    console.log(countries);
}); */

/* getExchangeRate('USD', 'EUR').then((rate) => {
    console.log(rate);
}); */