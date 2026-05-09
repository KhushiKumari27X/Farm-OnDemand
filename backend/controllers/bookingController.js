import Booking from "../models/Booking.js";
import Equipment from "../models/Equipment.js";

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private/Farmer
export const createBooking = async (req, res) => {
  try {
    const { equipmentId, rentalStartDate, rentalEndDate, totalAmount } = req.body;

    if (!equipmentId || !rentalStartDate || !rentalEndDate || !totalAmount) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.stock <= 0) {
      return res.status(400).json({ message: "Equipment is currently out of stock." });
    }

    const booking = new Booking({
      farmer: req.user._id,
      owner: equipment.owner,
      equipment: equipmentId,
      rentalStartDate,
      rentalEndDate,
      totalAmount,
      status: "pending",
    });

    const createdBooking = await booking.save();
    
    // Decrement stock upon successful booking request
    equipment.stock -= 1;
    if (equipment.stock === 0) {
      equipment.availabilityStatus = "rented";
    }
    await equipment.save();

    res.status(201).json(createdBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get logged in user's bookings (Farmer)
// @route   GET /api/bookings/mybookings
// @access  Private/Farmer
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ farmer: req.user._id }).populate(
      "equipment",
      "name image pricePerDay"
    ).populate("owner", "name phoneNumber");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get owner's booking requests
// @route   GET /api/bookings/requests
// @access  Private/Owner
export const getOwnerBookingRequests = async (req, res) => {
  try {
    const bookings = await Booking.find({ owner: req.user._id }).populate(
      "equipment",
      "name image category"
    ).populate("farmer", "name email phoneNumber address");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update booking status (Owner accepts/rejects)
// @route   PUT /api/bookings/:id/status
// @access  Private/Owner
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // "accepted", "rejected", "completed"

    const booking = await Booking.findById(req.params.id);

    if (booking) {
      if (booking.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
         return res.status(401).json({ message: "User not authorized" });
      }

      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("farmer", "id name")
      .populate("owner", "id name")
      .populate("equipment", "id name");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
