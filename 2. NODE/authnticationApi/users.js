const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
let _users = [];

function addUser(uName, pass) {

    const password =bcrypt.hashSync(pass,salt);
    const user = {
        username : uName,
        password : password
    }
    _users.push(user);
    console.log("From addUsers in users",_users);
    return user;
}

function verifyUser(uName, pass){
    let flag = false;
    
    const password = bcrypt.hashSync(pass,salt);
    const loginUser = _users.find((user) => {
        if(user.username == uName && user.password == password)
            return true;
    })

    if(loginUser) flag=true;
    return flag;
}

function getUsers(){
    return [..._users];
}

function findUser(uName){
    const loginUser = _users.find((user) => {
        if(user.username == uName)
            return true;
    })
    return loginUser;
}
module.exports = { addUser, verifyUser, findUser, getUsers };