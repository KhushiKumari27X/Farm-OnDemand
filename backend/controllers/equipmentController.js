import Equipment from "../models/Equipment.js";

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public
export const getEquipment = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const equipment = await Equipment.find({ ...keyword, ...category }).populate(
      "owner",
      "name email rating"
    );
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get equipment by ID
// @route   GET /api/equipment/:id
// @access  Public
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate(
      "owner",
      "name email rating phoneNumber"
    );

    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create an equipment
// @route   POST /api/equipment
// @access  Private/Owner
export const createEquipment = async (req, res) => {
  try {
    const { name, category, pricePerDay, description, location, availableFrom, availableTo, stock } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      // Temporary fallback for testing if no image uploaded
      imagePath = "https://images.unsplash.com/photo-1592982537447-6f23f66299b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }

    const equipment = new Equipment({
      name,
      pricePerDay,
      user: req.user._id,
      owner: req.user._id,
      image: imagePath,
      category,
      description,
      location,
      availableFrom,
      availableTo,
      stock: stock ? Number(stock) : 1
    });

    const createdEquipment = await equipment.save();
    res.status(201).json(createdEquipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update an equipment
// @route   PUT /api/equipment/:id
// @access  Private/Owner
export const updateEquipment = async (req, res) => {
  try {
    const { name, category, pricePerDay, description, location, availableFrom, availableTo, availabilityStatus, stock } = req.body;

    const equipment = await Equipment.findById(req.params.id);

    if (equipment) {
      // Check if user is the owner
      if (equipment.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: "User not authorized" });
      }

      equipment.name = name || equipment.name;
      equipment.category = category || equipment.category;
      equipment.pricePerDay = pricePerDay || equipment.pricePerDay;
      equipment.description = description || equipment.description;
      equipment.location = location || equipment.location;
      equipment.availableFrom = availableFrom || equipment.availableFrom;
      equipment.availableTo = availableTo || equipment.availableTo;
      equipment.availabilityStatus = availabilityStatus || equipment.availabilityStatus;
      if (stock !== undefined) {
        equipment.stock = Number(stock);
        if (equipment.stock === 0) {
          equipment.availabilityStatus = "rented";
        } else if (equipment.stock > 0 && equipment.availabilityStatus === "rented") {
          equipment.availabilityStatus = "available";
        }
      }

      if (req.file) {
        equipment.image = `/uploads/${req.file.filename}`;
      }

      const updatedEquipment = await equipment.save();
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete an equipment
// @route   DELETE /api/equipment/:id
// @access  Private/Owner or Admin
export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (equipment) {
      if (equipment.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: "User not authorized" });
      }

      await equipment.deleteOne();
      res.json({ message: "Equipment removed" });
    } else {
      res.status(404).json({ message: "Equipment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
