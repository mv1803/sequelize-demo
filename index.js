require('dotenv').config();
require('./helpers/global.js');
const config = require('./config/config')
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var multer = require('multer');
var upload = multer();
var fs = require('file-system')
var cors = require('cors')

app.use(cors())
app.use(upload.any());
app.use(bodyParser.json({limit: '50mb'}));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router()
require('./routes/routes')(router, {})
app.use('/api/v1/', router);

let server
if(config.protocol == 'https'){
    const https = require('https')
    server = https.createServer({
        key : fs.readFileSync(config.certificate.privkey,'utf8'),
        cert : fs.readFileSync(config.certificate.fullchain, 'utf8')
    }, app);
}
else{
    const http = require('http')
    server = http.createServer(app);
}

server.listen(config.port);
