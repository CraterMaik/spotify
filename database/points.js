const queries = require('./queries.js');
module.exports = {
  exists: async function(iduser) {
    let query =
      "SELECT * FROM points WHERE iduser = ? LIMIT 1";
    let result = await queries.getQuery(query, iduser);
    //[]
    
    if(result != undefined){
      return true;
    }
     return false;
  },
  registerUsers: async function(iduser) {
    let query = "INSERT INTO points(iduser, point, status) VALUES (?, ?, ?)";
    
    await queries.runQuery(query, [iduser, 0, 0]);
    
  },
  getPoint: async function(iduser){
    let query = "SELECT * FROM points WHERE iduser = ?";
    let result = await queries.getQuery(query, iduser);
    
    //console.log(result)
    return result;
  },

  addPoints: async function(iduser, newPoin){
    let query = "UPDATE points SET point = point + ? WHERE iduser = ?";
    
    await queries.runQuery(query, [newPoin, iduser]);
  },
  removePoints: async function(iduser, newPoin){
    //let querySelect = "SELECT * FROM userLevels WHERE iduser = ? AND idserver = ?";
    //let result = await queries.getQuery(querySelect, [iduser, idserver]);
    
    let query = "UPDATE points SET point = point - ? WHERE iduser = ?";
    //if(result)
    await queries.runQuery(query, [newPoin, iduser]);
  },
  viewTop: async function(){ 
    let query = "SELECT * FROM points ORDER BY point DESC LIMIT 10";
    let result = await queries.allQuery(query, [])
    return result;
  }

};