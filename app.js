const argv = process.argv.slice(2);
const Controller = require('./Controller.js');
let control = new Controller(argv);