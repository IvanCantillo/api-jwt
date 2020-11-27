const bcrypt = require('bcrypt');
const password = {}

password.encrypt = async(pass) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);
    return password;
}

password.decrypt = async(passLogin, pass) => {
    const isEqual = await bcrypt.compare(passLogin, pass);
    return isEqual;
}

module.exports = password;