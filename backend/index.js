import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;
const database = process.env.MONGO_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
console.log(process.env.MONGO_URL);

const AdminConnection = mongoose.createConnection(`${database}/admin`);
const UserConnection = mongoose.createConnection(`${database}/user`);
const packageConnection = mongoose.createConnection(`${database}/package`);
const OrderCollection = mongoose.createConnection(`${database}/orders`);

if (AdminConnection) {
  console.log("connect to admin");
}
if (UserConnection) {
  console.log("conntect to user");
}
if (OrderCollection) {
  console.log("connect to order collection");
}

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const admin = AdminConnection.model("admin", adminSchema);
app.post("/admin", async (req, res) => {
  try {
    // ✅ check if ANY admin exists
    const count = await admin.countDocuments();

    // 👉 if no data → create default admin
    if (count === 0) {
      await admin.create({
        username: "admin",
        password: "admin",
      });

      return res.json({
        success: true,
        message: "Default admin created. Use username: admin, password: admin",
      });
    }

    // ✅ login logic
    const { username, password } = req.body;

    const adminData = await admin.findOne({ username });

    if (!adminData) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (adminData.password === password) {
      return res.json({
        success: true,
        message: "Login successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

//getting dashboard data
const dashboardSchema = mongoose.Schema({
  orders: Number,
  revenue: Number,
  users: Number,
  pending: Number,
});

const dashboard = AdminConnection.model("dashboard", dashboardSchema);

app.put("/amount", async (req, res) => {
  try {
    const response = await orders.find({ PaymentStatus: true });
    const booking = await orders.countDocuments();
    // console.log(booking);
    let amount = 0;
    const pending = await orders.countDocuments({ PaymentStatus: false });
    // console.log(response.length);

    if (response.length > 0) {
      response.map((ele) => {
        amount += ele.NumberofPeople * ele.pricePerPerson;
      });
      const update = await dashboard.findOneAndUpdate(
        {},
        { revenue: amount, orders: booking, pending },
      );
      if (update) {
        console.log("amount updated");
        res.json({
          success: true,
        });
      }
    }
    // console.log(amount);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-dashboard", async (req, res) => {
  try {
    const data = await dashboard.find();
    if (data) {
      res.json({
        success: true,
        data: data,
      });
    } else {
      console.log("data not found");
      res.json({
        success: false,
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "internal server Error",
    });
  }
});

//getting admin data
app.get("/get-admin", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false });
    }

    const adminData = await admin.findOne({ username });

    if (!adminData) {
      return res.status(401).json({ success: false });
    }

    return res.json({
      success: true,
      username: adminData.username,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});
// getting admin details
app.get("/get-admin-data/:username", async (req, res) => {
  const { username } = req.params;
  let data = username;
  console.log(data);
  if (!data) {
    return res.status(404);
  }
  try {
    const isAdmin = await admin.findOne({ username });
    console.log(isAdmin);
    if (isAdmin) {
      res.json({
        success: true,
        data: isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "failed to get data",
    });
  }
});
//updating admin

// ================= UPDATE ADMIN =================
app.put("/update-admin/:username", async (req, res) => {
  const { username } = req.params;
  const { newUsername, password } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username param missing",
    });
  }

  if (!newUsername || !password) {
    return res.status(400).json({
      success: false,
      message: "New username & password required",
    });
  }

  try {
    const updatedAdmin = await admin.findOneAndUpdate(
      { username: username },
      {
        username: newUsername,
        password: password,
      },
      { new: true },
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

//creating package
const packageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  rating: Number,
  days: Number,
});
const packages = packageConnection.model("package", packageSchema);

app.post("/create-package", async (req, res) => {
  try {
    let isPackage = await packages.findOne({ name: req.body.name });
    console.log(isPackage);
    if (isPackage) {
      res.json({
        success: false,
        message: "Package already exist",
      });
    } else {
      const data = req.body;
      console.log(data);
      const response = packages.create(data);
      if (response) {
        res.json({
          success: true,
          message: "item saved",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "item not saved",
        });
      }
    }
  } catch (error) {
    res.send(404, "error \n");
    console.log(error);
  }
});

//get package for seperate tabs details
app.post("/get-package-details", async (req, res) => {
  const { id } = req.body;

  console.log("Received ID:", id);

  // ✅ Validate ID
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID is required",
    });
  }

  try {
    const data = await packages.findById(id); // ✅ better method

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
});

//getting all package
app.get("/get-package", async (req, res) => {
  const response = await packages.find();
  res.json(response);
});

//updating packages
app.put("/update-package", async (req, res) => {
  const { _id, ...data } = req.body;
  // console.log(data)
  console.log(`updating this id${_id}`);
  if (!_id) {
    return res.status(400).json({
      success: false,
      message: "ID is required",
    });
  }
  try {
    const isUpdated = await packages.findOneAndUpdate({ _id }, data, {
      returnDocument: true,
    });
    // console.log(isUpdated)
    if (isUpdated) {
      res.json({
        success: true,
        message: "item updated",
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unable to update item",
    });
    console.log(error);
  }
});

//deleting packages
app.delete("/delete-package/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const deletedItem = await packages.findByIdAndDelete(id);
    console.log("Deleted Item:", deletedItem);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/*===============================Payment============================ */
app.put("/update-payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // true / false (BOOLEAN)

    console.log(typeof status, status); // debug

    const updatedOrder = await orders.findOneAndUpdate(
      { _id: id },
      { PaymentStatus: status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
    });
  }
}); /* =============================================================
Both User And Admin Apis
============================================================ */
const orderSchema = mongoose.Schema({
  PackageName: String,
  customerName: String,
  userId: String,
  TravelDate: String,
  NumberofPeople: Number,
  pricePerPerson: Number,
  Status: String,
  PaymentStatus: Boolean,
});

const orders = OrderCollection.model("order", orderSchema);

app.get("/get-orders", async (req, res) => {
  try {
    const isOrder = await orders.find();

    const count = await orders.countDocuments();
    if (isOrder.length > 0) {
      return res.json({
        success: true,
        data: isOrder,
        count: count,
      });
    } else {
      return res.json({
        success: false,
        message: "noo orders",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Erro",
    });
  }
});

app.post("/create-order", async (req, res) => {
  try {
    const data = req.body;

    if (!data.PackageName || !data.pricePerPerson || !data.userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newOrder = await orders.create({
      PackageName: data.PackageName,
      customerName: data.customerName,
      userId: data.userId, // ✅ VERY IMPORTANT
      TravelDate: data.TravelDate,
      NumberofPeople: data.NumberofPeople,
      pricePerPerson: data.pricePerPerson,
      Status: "Booked",
      PaymentStatus: false,
    });

    res.json({
      success: true,
      message: "Order placed successfully 🎉",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});
/*====================================================USER SECTION
=========================================================================================================*/
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const users = UserConnection.model("user", userSchema);

app.get("/get-userorders/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const request = await orders.find({ userId: id });
      console.log(request);
      if (request.length > 0) {
        return res.status(200).json({
          success: true,
          data: request,
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "orders not found",
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: "internal server error",
      });
      console.log(error);
    }
  } else {
    return res.status(404);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    await users.create({ username, password });

    res.json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password === password) {
      return res.json({
        success: true,
        message: "Login success",
        userId: user._id, // ✅ IMPORTANT
      });
    } else {
      return res.json({
        success: false,
        message: "Wrong password",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
