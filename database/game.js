// Create database in form of model from sequelize.

// Store Item
// Item เอาไว้เก็บข้อมูลของสินเค้า ในที่นี่คือไอเทมเกม โดยมีattributes ตามที่โจทย์กำหนด
const Item = sequelize.define("Item", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  productName: Sequelize.STRING, //product name
  productDetail: Sequelize.TEXT, //product detail
  salePrice: Sequelize.INTEGER, //sale price
  openSaleDate: Sequelize.DATE, //open sale date
  endSaleDate: Sequelize.DATE, //end sale date
});

// Store Purchase -> เอาไว้เก็บโค้ดเมื่อ customer ซื้อไอเทมสำเร็จ
const Purchase = sequelize.define("Purchase", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  code: Sequelize.STRING,
});

// Store Discount -> เอาไว้เก็บส่วนลดและวันหมดอายุของโค้ด
const Discount = sequelize.define("Discount", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  discountPrice: Sequelize.INTEGER,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
});

// Bonus
// Store Bundle -> เอาไว้เก็บข้อมูล bundle 
const Bundle = sequelize.define("Bundle", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  bundleName: Sequelize.STRING,
  bundlePrice: Sequelize.INTEGER,
});

// relationship ของ purchase table กับ item table แบบ one-to-many 
Purchase.belongsTo(Item, { foreignKey: "itemId" });

// relationship ของ discount table กับ item table แบบ one-to-one
Item.hasOne(Discount, { foreignKey: "itemId" });

// relationship ของ bundle table กับ item table แบบ one-to-many
Item.belongsTo(Bundle, { foreignKey: "bundleId" });

// relationship ของ bundle table กับ purchase table แบบ one-to-many
Bundle.hasMany(Item, { foreignKey: "bundleId" });

// database นี้ออกแบบมาเพื่อระบบซื้อขาย code item ในเกม 
// โดย มี item เอาไว้เก็บข้อมูลของไอเทมในเกม 
// มี purchase เอาไว้เก็บโค้ดที่ทำการ generate แล้วจะส่งไปก็ต่อเมื่อมีการซื้อขายสำเร็จ
// มี discount เอาไว้เก็บส่วนลดและวันหมดอายุของโค้ด
// มี bundle เอาไว้เก็บข้อมูล bundle ต่างๆของเกม
// มี ERD ที่ folder assets โดยใช้ supabase เพื่อสร้าง mock up database



