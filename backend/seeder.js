import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Equipment from "./models/Equipment.js";
import Booking from "./models/Booking.js";
import Feedback from "./models/Feedback.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImagesDir = path.join(__dirname, "../frontend/src/assets/images");
const uploadsDir = path.join(__dirname, "uploads");

const copyImageToUploads = (sourceFilename, destFilename) => {
  const sourcePath = path.join(sourceImagesDir, sourceFilename);
  const destPath = path.join(uploadsDir, destFilename);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    return `/uploads/${destFilename}`;
  }
  return "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
};

const indianLocations = ["Ludhiana, Punjab", "Karnal, Haryana", "Amritsar, Punjab", "Ahmedabad, Gujarat", "Rohtak, Haryana", "Patiala, Punjab", "Ambala, Haryana", "Indore, MP", "Bhopal, MP", "Pune, Maharashtra", "Nagpur, Maharashtra"];

const generateRandomUsers = async (role, count, defaultPassword) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = await User.create({
      name: `${role === 'owner' ? 'Owner' : 'Farmer'} User ${i + 1}`,
      email: `${role}${i + 1}@farmondemand.com`,
      password: defaultPassword,
      role: role,
      phoneNumber: `98765${Math.floor(10000 + Math.random() * 90000)}`,
      address: indianLocations[Math.floor(Math.random() * indianLocations.length)],
    });
    users.push(user);
  }
  return users;
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Booking.deleteMany();
    await Equipment.deleteMany();
    await Feedback.deleteMany();
    await User.deleteMany({ email: { $ne: "shreyasinghrajput2110@gmail.com" } });
    console.log("Data cleared (except specific admin)");

    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash("123456", salt);

    let adminUser = await User.findOne({ email: "shreyasinghrajput2110@gmail.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Shreya Singh",
        email: "shreyasinghrajput2110@gmail.com",
        password: defaultPassword,
        role: "admin",
        phoneNumber: "9999999999",
        address: "Admin HQ",
      });
    }

    const owners = await generateRandomUsers("owner", 5, defaultPassword);
    const farmers = await generateRandomUsers("farmer", 15, defaultPassword);
    console.log(`Users created: 5 Owners, 15 Farmers`);

    // Get all image files
    const imageFiles = fs.readdirSync(sourceImagesDir).filter(file => file.match(/\.(jpg|jpeg|png|webp|avif)$/));
    
    const equipmentDocs = [];
    const numEquipment = 50;

    for (let i = 0; i < numEquipment; i++) {
      const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
      let category = "Other";
      if (randomImage.includes("tractor")) category = "Tractor";
      else if (randomImage.includes("harvest") || randomImage.includes("combine")) category = "Harvester";
      else if (randomImage.includes("seed")) category = "Seeder";
      else if (randomImage.includes("plow") || randomImage.includes("cultivator") || randomImage.includes("harrow")) category = "Plow";

      const owner = owners[Math.floor(Math.random() * owners.length)];
      const destFilename = `seed_eq_${i}_${Date.now()}${path.extname(randomImage)}`;
      const imagePath = copyImageToUploads(randomImage, destFilename);

      const eq = await Equipment.create({
        name: `High-Performance ${category} Model ${i + 1}`,
        image: imagePath,
        category: category,
        description: `This is a heavy-duty ${category} located in ${owner.address}. Well maintained and ready for booking. Excellent condition for all farming needs.`,
        pricePerDay: Math.floor(400 + Math.random() * 3000),
        location: owner.address,
        stock: Math.floor(1 + Math.random() * 5),
        availableFrom: new Date(),
        availableTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        availabilityStatus: "available",
        user: owner._id,
        owner: owner._id,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 50) + 1
      });
      equipmentDocs.push(eq);
    }
    console.log(`Created 50 Equipment items`);

    // Bookings
    const numBookings = 40;
    const statuses = ["pending", "accepted", "rejected", "completed"];
    for (let i = 0; i < numBookings; i++) {
      const farmer = farmers[Math.floor(Math.random() * farmers.length)];
      const equipment = equipmentDocs[Math.floor(Math.random() * equipmentDocs.length)];
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10) - 5);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(1 + Math.random() * 14));

      await Booking.create({
        farmer: farmer._id,
        owner: equipment.owner,
        equipment: equipment._id,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        totalAmount: equipment.pricePerDay * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    console.log(`Created 40 Bookings`);

    // Feedback
    for (let i = 0; i < 15; i++) {
      const farmer = farmers[Math.floor(Math.random() * farmers.length)];
      await Feedback.create({
        user: farmer._id,
        rating: Math.floor(3 + Math.random() * 3),
        review: ["Great platform, easy to use!", "The equipment was delivered on time.", "Saved me a lot of money on rentals.", "Good service but could be improved.", "Highly recommended for all farmers."][Math.floor(Math.random() * 5)]
      });
    }
    console.log(`Created 15 Feedbacks`);

    console.log("SUCCESS: Database Seeded with Large Real Data!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

importData();
