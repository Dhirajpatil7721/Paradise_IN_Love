import bcryptjs from "bcryptjs";
// import UserModel from "../models/user.model.js";
import UserModel from "../Paradise_IN_Love_Backend/models/user.model.js";

const createAdmin = async () => {
  try {
    const email = "admin@paradies.com"; // Default admin email
    const existingAdmin = await UserModel.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Default admin already exists");
      return;
    }

    // Generate hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash("Admin@123", salt);

    // Create new admin user
    const adminUser = new UserModel({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
      status: "Active",
      verify_email: true,
    });

    await adminUser.save();
    console.log("🎉 Default admin created successfully");
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

export default createAdmin;
