var winston = require('winston');
require('winston-daily-rotate-file');
var fs = require('fs');
const environment = process.env.mode || "dev"

console.log("CURRENT ENVIRONMENT",environment);

// const tsFormat = () => (new Date()).toLocaleTimeString();

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}


const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new winston.transports.Console({
      name : 'Development',
      level: environment === 'dev' ? 'debug' : 'OFF',
      prettyPrint :true,
      timestamp: true,
      colorize: true,
      timestamp: true,
    }),

    new winston.transports.DailyRotateFile({
      name :'Production',
      level: environment === 'prod' ? 'info' :'OFF',
      filename: `logs/-prodlog.log`,
      prettyPrint: true,
      timestamp: true,
      maxsize: 20000,
      prepend:true,
      json:false
    }),

    new winston.transports.DailyRotateFile({
      name :'UAT/QA',
      level: environment === 'uat/qa' ? 'info' :'OFF',
      filename:`logs/-staginglog.log`,
      prettyPrint: true,
      timestamp: true,
      maxsize: 20000,
      prepend:true,
      json:false
    })

    
  ]
});



logger.info('Hello world');
logger.debug('Debugging info');
logger.warn('warn msg');
logger.error('error msg');
