const usersQuery = require("../query");

const app_id = "4384c64d-c68b-4dba-ae9d-e05bfc6c21e9";

export const sendNotificationToAllCustomer = async (message: string) => {
  const res = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    body: JSON.stringify({
      app_id,
      contents: { en: message },
      url: ``,
    }),
    headers: { "content-type": "application/json" },
  });

  console.log(await res.json());
};

export const sendNotificationToOneCustomer = async (
  message: string,
  customerMail: string
) => {
  const user: any[] = await usersQuery("SELECT * FROM users WHERE email = ?", [
    customerMail,
  ]);
  if (!user[0].pushToken) {
    console.log("no user with this mail");
    return;
  }
  const res = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    body: JSON.stringify({
      app_id,
      include_player_ids: [user[0].pushToken],
      contents: { en: message },
      url: ``,
    }),
    headers: { "content-type": "application/json" },
  });

  console.log(await res.json());
};
