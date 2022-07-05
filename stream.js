const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt");

const ws = fs.createWriteStream("./files/lorem2.txt");

// rs.on("data", (datachuck) => {
//   ws.write(datachuck);
// });

rs.pipe(ws);
