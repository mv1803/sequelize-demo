const config = require('../config/config')
function getFileName(str){
    try{
        return new URL(str).pathname.split('/').pop();
    }
    catch(e){
        return null
    }
}

module.exports = {
    getFileName
}
