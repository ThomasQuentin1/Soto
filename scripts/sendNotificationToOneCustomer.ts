import { sendNotificationToOneCustomer } from "../server/utils/notifications";
const start = async () => {
  if (!process.argv[2]) {
    throw "missing message";
  }
  if (!process.argv[3]) {
    throw "missing customer's email";
  }
  sendNotificationToOneCustomer(process.argv[2], process.argv[3]);
};

start()
  .then(() => {
    console.log("Ok");
    process.exit(0);
  })
  .catch((ex) => {
    console.warn(ex);
    process.exit(1);
  });
