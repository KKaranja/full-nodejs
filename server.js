// console.log(global);
// const os = require("os");

const fsPromises = require("fs").promises;

const path = require("path");

// const { add, subtract, multiply, divide } = require("./math");

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(add(4, 2));
// console.log(subtract(4, 2));

// console.log(multiply(4, 2));
// console.log(divide(4, 2));

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "lorem.txt")
    );
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// fs.readFile(, "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log("hello...");

// fs.writeFile(
//   path.join(__dirname, "files", "isaac.txt"),
//   "My name is Isaac Kimura",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");
//   }
// );

// fs.appendFile(
//   path.join(__dirname, "files", "test.txt"),
//   "Testing text",
//   (err) => {
//     if (err) throw err;
//     console.log("Append complete");
//   }
// );

// exit on uncaught error

// process.on("uncaughtException", (err) => {
//   console.error(`There was uncaught error:${err}`);
//   process.exit(1);
// });
