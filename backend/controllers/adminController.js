import User from "../models/User.js";
import Equipment from "../models/Equipment.js";
import Booking from "../models/Booking.js";

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const farmersCount = await User.countDocuments({ role: "farmer" });
    const ownersCount = await User.countDocuments({ role: "owner" });
    const equipmentCount = await Equipment.countDocuments();
    const bookingsCount = await Booking.countDocuments();

    // Calculate total revenue (sum of all completed/accepted bookings)
    const revenueResult = await Booking.aggregate([
      { 
        $match: { 
          status: { $in: ["completed", "accepted"] } 
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: "$totalAmount" } 
        } 
      }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      farmers: farmersCount,
      owners: ownersCount,
      equipment: equipmentCount,
      bookings: bookingsCount,
      revenue: totalRevenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching stats" });
  }
};

// @desc    Get users by role
// @route   GET /api/admin/users/:role
// @access  Private/Admin
export const getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;
    if (!["farmer", "owner", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const users = await User.find({ role }).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    // Also delete their equipment/bookings if they are an owner/farmer
    if (user.role === "owner") {
      await Equipment.deleteMany({ owner: user._id });
    }
    await Booking.deleteMany({ $or: [{ farmer: user._id }, { owner: user._id }] });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting user" });
  }
};
