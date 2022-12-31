function getServiceUrl(fileName) {
    return process.env.APP_PROJECT_PATH + '/images/service_images/' + fileName;
}

module.exports = {
    getServiceUrl
};
