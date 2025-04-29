const functions = require("firebase-functions");
const admin     = require("firebase-admin");
const sgMail    = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.notifyNewOrder = functions.database
  .ref("/orders/{pushId}")
  .onCreate(async (snapshot, context) => {
    const order = snapshot.val();
    const msg = {
      to:   "melmel1226@icloud.com", // ★あなたが受け取りたいメールアドレスに直す！
      from: "no-reply@ayra-shop.jp",
      subject: `新しい注文が入りました（ID: ${order.orderId}）`,
      text: `
注文ID：${order.orderId}
購入者：${order.payerName} <${order.payerEmail}>
住所：${order.noteAddress}
合計：¥${order.amount} ${order.currency}
カート内容：
${order.cart.map(i => `- ${i.title}（¥${i.price}）`).join("\n")}
      `
    };
    await sgMail.send(msg);
    console.log("Order notification email sent:", order.orderId);
  });

  