var fs = require('fs');
var array = fs.readFileSync('server/anonnames.txt').toString().split("\n");
export default array;
