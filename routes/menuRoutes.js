const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

// add new menu items
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();

    console.log("menu added successfully");

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("menu with taste fetched");

      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get method to get the menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu fetched");

    res.status(200).json(data);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Menu Not Found" });
    }

    console.log("menu item updated ");

    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu Not Found" });
    }

    console.log("menu deleted ");

    res.status(200).json({ message: " menu deleted successfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
