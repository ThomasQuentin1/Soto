import { sendNotificationToAllCustomer } from "../server/utils/notifications";
const start = async () => {
  if (!process.argv[2]) {
    throw "missing message";
  }
  sendNotificationToAllCustomer(process.argv[2]);
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
