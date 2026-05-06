require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const users = require("./users.json");

// transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const sendEmails = async () => {
  let count = 0;

  for (let user of users) {
    const name = user.name || "Sir/Madam";

    try {
      await transporter.sendMail({
        from: `"UGS Unity Global Solutions" <${process.env.EMAIL_USER}>`,
        to: user.email,

        subject:
          "Premium Dehydrated, Herbal Powders & Essential Oils Supplier from India",

        html: `
<div style="font-family:Arial, sans-serif; text-align:center;">

  <!-- Greeting -->
  <div style="margin:20px 0;">
    <div style="display:inline-block; background:#eef5f1; padding:14px 22px; border-radius:6px;">
      Hello <strong>${name}</strong>,
    </div>
  </div>

  <!-- Intro -->
  <p style="max-width:520px; margin:auto;">
    <strong>UGS Unity Global Solutions</strong> is a trusted export partner delivering 
    <strong>premium dehydrated products, herbal powders & essential oils from India</strong> — 
    built on our principle <em>“Traffic in Trust.”</em>
  </p>

  <!-- Product Info -->
  <p style="margin-top:20px; font-size:18px; color:#2f6f4e;">
    <strong>Our Product Range Includes:</strong>
  </p>

<ul style="list-style:none; padding:0; font-size:15px; text-align:center; max-width:500px; margin:0 auto;">
  <li>• Dehydrated Onion Powder (HS Code: 0712.20.00)</li>
  <li>• Dehydrated Garlic Powder (HS Code: 0712.90.20)</li>
  <li>• Dehydrated Vegetable Powders (HS Code: 0712.90.90)</li>
  <li>• Bamboo Salt (HS Code: 2501.00.90)</li>
  <li>• Neem Powder (HS Code: 1211.90.29)</li>
  <li>• Tulsi Powder (HS Code: 1211.90.29)</li>
  <li>• Ashwagandha Powder (HS Code: 1211.90.19)</li>
  <li>• Multani Mitti / Fuller’s Earth (HS Code: 1404.90.90)</li>
  <li>• Tea Tree Oil (HS Code: 3301.29.90)</li>
  <li>• Eucalyptus Oil (HS Code: 3301.29.30)</li>
  <li>• Lavender Oil (HS Code: 3301.29.40)</li>
</ul>

  <!-- Why Choose -->
  <p style="margin-top:20px; font-size:18px; color:#2f6f4e;">
    <strong>Why Choose UGS?</strong>
  </p>

  <ul style="list-style:none; padding:0; font-size:15px;">
    <li>• 100% Natural & Export Quality</li>
    <li>• Hygienic Processing & Packaging</li>
    <li>• Bulk Supply Capability</li>
    <li>• Competitive Global Pricing</li>
    <li>• Reliable Logistics & Timely Delivery</li>
  </ul>


  <!-- PRODUCT IMAGES MOVED TO BOTTOM -->
  <div style="margin:30px 0;">
    <table align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:10px;">
          <img src="cid:product1" width="500" style="border-radius:8px;" />
        </td>
        <td style="padding:10px;">
          <img src="cid:product2" width="500" style="border-radius:8px;" />
        </td>
      </tr>
    </table>
  </div>

  <!-- CTA -->
  <div style="margin:30px 0;">
    <a href="https://wa.me/919949636274?text=Hello%20I%20am%20interested%20in%20your%20product%20catalogue"
       style="display:inline-block;
              padding:14px 24px;
              background:#2e7d32;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;">
    Connect on WhatsApp
    </a>
  </div>

  <!-- Contact -->
  <p>
    📱 +91 9949636274 <br/>
    📧 info@ugsinternational.com
  </p>

  <hr/>

  <p style="font-size:12px; color:#777;">
    UGS Unity Global Solutions <br/>
    Traffic in Trust • From Local to Global
  </p>

</div>
`,

        attachments: [
          {
            filename: "product1.jpg",
            path: path.join(__dirname, "product1.jpg"),
            cid: "product1",
          },
          {
            filename: "product2.jpg",
            path: path.join(__dirname, "product2.jpg"),
            cid: "product2",
          },
        ],
      });

      console.log(`✅ Sent to: ${user.email}`);
      count++;

      await delay(1000);

      if (count >= 500) {
        console.log("⚠️ Reached daily limit");
        break;
      }

    } catch (error) {
      console.error(`❌ Failed: ${user.email}`, error.message);
    }
  }

  console.log(`📊 Total emails sent: ${count}`);
};

sendEmails();