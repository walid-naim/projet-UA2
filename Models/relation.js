import Category from "./Category1.js";
import Product from "./Product1.js";
import Client from "./Client1.js";
import Order from "./command1.js";
import Employee from "./employé1.js";
import OrderDetail from "./détail de la commande1.js";
import PaymentMethod from "./méthode de paiement1.js";
import Transaction from "./transaction de paiement1.js";

// Relations between entities

// Category and Product
Category.hasMany(Product, { foreignKey: "ID_Categorie" });
Product.belongsTo(Category, { foreignKey: "ID_Categorie" });

// Client and Order
Client.hasMany(Order, { foreignKey: "ID_client" });
Order.belongsTo(Client, { foreignKey: "ID_client" });

// Employee and Order
Employee.hasMany(Order, { foreignKey: "ID_Employe" });
Order.belongsTo(Employee, { foreignKey: "ID_Employe" });

// Order and OrderDetail (1:M relationship)
Order.hasMany(OrderDetail, { foreignKey: "ID_commande" });
OrderDetail.belongsTo(Order, { foreignKey: "ID_commande" });

// Product and OrderDetail (M:1 relationship)
Product.hasMany(OrderDetail, { foreignKey: "ID_produit" });
OrderDetail.belongsTo(Product, { foreignKey: "ID_produit" });

// Order and PaymentMethod (1:M relationship)
Order.hasMany(PaymentMethod, { foreignKey: "ID_commande" });
PaymentMethod.belongsTo(Order, { foreignKey: "ID_commande" });

// PaymentMethod and PaymentTransaction (1:M relationship)
PaymentMethod.hasMany(Transaction, { foreignKey: "ID_paiement" });
Transaction.belongsTo(PaymentMethod, { foreignKey: "ID_paiement" });

export   { Category, Product, Client, Order, Employee, OrderDetail, PaymentMethod, Transaction };
