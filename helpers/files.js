var uid = require('rand-token').uid;
var fs = require("fs");
var path = require('path');
const base64ToImage = require('base64-to-image');

function storeB64(string, pathFolder = 'service_images'){
    temp = string.split(';')[0]
    temp = temp.split(':')[1]
    temp = temp.split('/')[1]
    profileImageName = uid(16)
    var uploadPath = './public/images/' + pathFolder+ '/';
    var optionalObj = {'fileName': profileImageName, 'type': temp};
    var imageInfo = base64ToImage(string, uploadPath, optionalObj)
    return imageInfo.fileName
}

function uploadFile(fileObjArray, pathFolder = 'profile') {
    //WIP  : need to identify field name from array object : https://stackoverflow.com/questions/5181493/how-to-find-a-value-in-an-array-of-objects-in-javascript
    var profileImageName = null;
    if (this.isArrayDefine(fileObjArray)) {
        profileImageName = uid(16)  + path.extname(fileObjArray[0].originalname);
        var uploadPath = './public/images/' + pathFolder+ '/'+ profileImageName;
        var outStream = fs.createWriteStream(uploadPath);
        outStream.write(fileObjArray[0].buffer);
        outStream.end();
    }
    return profileImageName;
}

async function deleteFile(fileName, pathFolder = 'profile'){
    try{
        var deletePath = './public/images/' + pathFolder+ '/'+ fileName;
        await fs.unlinkSync(deletePath);
        return true
    }
    catch(e){
        return false
    }
}

function isFileFieldExist(fileObjArray, fileFieldName) {
    if (this.isArrayDefine(fileObjArray)) {
        if (fileObjArray[0].fieldname == fileFieldName) {
            return true;
        }
    }
    return false;
}

function isArrayDefine(fileObjArray) {
    if (typeof fileObjArray !== 'undefined' && fileObjArray.length > 0) {
        return true;
    }
    return false;
}

module.exports = {
    uploadFile,
    isFileFieldExist,
    isArrayDefine,
    storeB64,
    deleteFile
};
