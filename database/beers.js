const queries = require('./queries.js');
// beers iduser TEXT, beers INTEGER

module.exports = {
  exists: async function (iduser) {
    let query = "SELECT * FROM beers WHERE iduser = ? LIMIT 1";
    let result = await queries.getQuery(query, iduser);

    if (result != undefined) {
      return true;
    }
    return false;

  },
  registerUsers: async function (iduser) {
    let query = "INSERT INTO beers(iduser, beers) VALUES (?, ?)";

    await queries.runQuery(query, [iduser, 0]);

  },
  getBeers: async function (iduser) {
    let query = "SELECT iduser, beers FROM beers WHERE iduser = ?";
    let result = await queries.getQuery(query, iduser);

    return result;
  },

  addBeers: async function (iduser, newBeers) {
    let query = "UPDATE beers SET beers = beers + ? WHERE iduser = ?";
    await queries.runQuery(query, [newBeers, iduser]);

  },
  giftBeers: async function (iduser, idgift, amount) {
    //gift
    let query = "UPDATE beers SET beers = beers - ? WHERE iduser = ?";
    let queryMe = "UPDATE beers SET beers = beers + ? WHERE iduser = ?";

    await queries.runQuery(query, [amount, iduser]);
    await queries.runQuery(queryMe, [amount, idgift]);

  },
  removeBeers: async function (iduser, newBeers) {
    let query = "UPDATE beers SET beers = beers - ? WHERE iduser = ?";
    await queries.runQuery(query, [newBeers, iduser]);

  }

};