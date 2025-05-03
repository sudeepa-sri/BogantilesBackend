const express = require('express');
const router = express.Router();
const Tile = require('../models/Tile');
const mongoose = require('mongoose'); // ✅ Added this
const multer = require('multer');
const fs = require('fs').promises;

const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// --------- Routes ---------
// Route to get distinct kitchen tile colors



// GET /api/tiles/trending
router.get('/trending', async (req, res) => {
  console.log("Fetching trending tiles...");
  try {
    const trendingTiles = await Tile.find({ isTrending: true });
    res.json(trendingTiles);
  } catch (error) {
    console.error('Error fetching trending tiles:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/fast-selling', async (req, res) => {
  try {
    const fastSellingTiles = await Tile.find({ isFastSelling: true });
    res.json(fastSellingTiles);
  } catch (error) {
    console.error('Error fetching fast-selling tiles:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Backend logic to fetch tiles based on filter parameters
// Backend logic to fetch tiles based on filter parameters
router.get('/category/kitchen', async (req, res) => {
  try {
    const { color, material, finish, minPrice, maxPrice } = req.query;
    const filter = { category: 'Kitchen Tile' };

    if (color) filter.color = color;
    if (material) filter.material = material;
    if (finish) filter.finish = finish;

    // Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    console.log('Filter:', filter); // Log filter parameters for debugging

    const kitchenTiles = await Tile.find(filter);

    if (kitchenTiles.length === 0) {
      return res.json({ message: 'No kitchen tiles found', tiles: [] });
    }

    res.json(kitchenTiles);
  } catch (error) {
    console.error('Error fetching kitchen tiles:', error);
    res.status(500).json({ message: 'Error fetching kitchen tiles', error: error.message });
  }
});



// Route to get distinct colors for kitchen tiles
router.get('/category/kitchen/colors', async (req, res) => {
  try {
    const colors = await Tile.distinct('color', { category: 'Kitchen Tile' });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colors', error: error.message });
  }
});

// Route to get distinct materials for kitchen tiles
router.get('/category/kitchen/materials', async (req, res) => {
  try {
    const materials = await Tile.distinct('material', { category: 'Kitchen Tile' });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error: error.message });
  }
});

router.get('/category/kitchen/finish', async (req, res) => {
  try {
    const finishes = await Tile.distinct('finish', { category: 'Kitchen Tile' });
    res.json(finishes);
  } catch (error) {
    console.error('Error fetching finishes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to get bathroom tiles with filters
router.get('/category/bathroom', async (req, res) => {
  try {
    const { color, material, finish, minPrice, maxPrice } = req.query;
    const filter = { category: 'Bathroom Tile' };

    if (color) filter.color = color;
    if (material) filter.material = material;
    if (finish) filter.finish = finish;

    // Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    console.log('Filter:', filter); // Log filter parameters for debugging

    const bathroomTiles = await Tile.find(filter);

    if (bathroomTiles.length === 0) {
      return res.json({ message: 'No bathroom tiles found', tiles: [] });
    }

    res.json(bathroomTiles);
  } catch (error) {
    console.error('Error fetching bathroom tiles:', error);
    res.status(500).json({ message: 'Error fetching bathroom tiles', error: error.message });
  }
});

// Route to get distinct colors for bathroom tiles
router.get('/category/bathroom/colors', async (req, res) => {
  try {
    const colors = await Tile.distinct('color', { category: 'Bathroom Tile' });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colors', error: error.message });
  }
});

// Route to get distinct materials for bathroom tiles
router.get('/category/bathroom/materials', async (req, res) => {
  try {
    const materials = await Tile.distinct('material', { category: 'Bathroom Tile' });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error: error.message });
  }
});

// Route to get distinct finishes for bathroom tiles
router.get('/category/bathroom/finish', async (req, res) => {
  try {
    const finishes = await Tile.distinct('finish', { category: 'Bathroom Tile' });
    res.json(finishes);
  } catch (error) {
    console.error('Error fetching finishes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get floor tiles with filters
router.get('/category/floor', async (req, res) => {
  try {
    const { color, material, finish, minPrice, maxPrice } = req.query;
    const filter = { category: 'Floor Tile' };

    if (color) filter.color = color;
    if (material) filter.material = material;
    if (finish) filter.finish = finish;

    // Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    console.log('Floor Tile Filter:', filter);

    const floorTiles = await Tile.find(filter);

    if (floorTiles.length === 0) {
      return res.json({ message: 'No floor tiles found', tiles: [] });
    }

    res.json(floorTiles);
  } catch (error) {
    console.error('Error fetching floor tiles:', error);
    res.status(500).json({ message: 'Error fetching floor tiles', error: error.message });
  }
});

// Route to get distinct colors for floor tiles
router.get('/category/floor/colors', async (req, res) => {
  try {
    const colors = await Tile.distinct('color', { category: 'Floor Tile' });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colors', error: error.message });
  }
});

// Route to get distinct materials for floor tiles
router.get('/category/floor/materials', async (req, res) => {
  try {
    const materials = await Tile.distinct('material', { category: 'Floor Tile' });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error: error.message });
  }
});

// Route to get distinct finishes for floor tiles
router.get('/category/floor/finish', async (req, res) => {
  try {
    const finishes = await Tile.distinct('finish', { category: 'Floor Tile' });
    res.json(finishes);
  } catch (error) {
    console.error('Error fetching finishes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to get outdoor tiles with filters
router.get('/category/outdoor', async (req, res) => {
  try {
    const { color, material, finish, minPrice, maxPrice } = req.query;
    const filter = { category: 'Outdoor Tile' };

    if (color) filter.color = color;
    if (material) filter.material = material;
    if (finish) filter.finish = finish;

    // Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    console.log('Outdoor Tile Filter:', filter);

    const outdoorTiles = await Tile.find(filter);

    if (outdoorTiles.length === 0) {
      return res.json({ message: 'No outdoor tiles found', tiles: [] });
    }

    res.json(outdoorTiles);
  } catch (error) {
    console.error('Error fetching outdoor tiles:', error);
    res.status(500).json({ message: 'Error fetching outdoor tiles', error: error.message });
  }
});

// Route to get distinct colors for outdoor tiles
router.get('/category/outdoor/colors', async (req, res) => {
  try {
    const colors = await Tile.distinct('color', { category: 'Outdoor Tile' });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colors', error: error.message });
  }
});

// Route to get distinct materials for outdoor tiles
router.get('/category/outdoor/materials', async (req, res) => {
  try {
    const materials = await Tile.distinct('material', { category: 'Outdoor Tile' });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error: error.message });
  }
});

// Route to get distinct finishes for outdoor tiles
router.get('/category/outdoor/finish', async (req, res) => {
  try {
    const finishes = await Tile.distinct('finish', { category: 'Outdoor Tile' });
    res.json(finishes);
  } catch (error) {
    console.error('Error fetching finishes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// POST /api/tiles
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      price,
      size,
      material,
      finish,
      color,
      category,
      isTrending,
      isFastSelling
    } = req.body;

    // Basic validation for required fields
    if (!name || !price || !category || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const tile = new Tile({
      name,
      shortDescription,
      description,
      price,
      size,
      material,
      finish,
      color,
      category,
      imageUrl,
      isTrending: isTrending === 'true',
      isFastSelling: isFastSelling === 'true'
    });

    await tile.save();
    console.log('Tile data:', tile);
    console.log('Is Trending:', tile.isTrending);
    console.log('Is Fast Selling:', tile.isFastSelling);

    res.status(201).json({ message: 'Tile added successfully', tile });
  } catch (error) {
    res.status(500).json({ message: 'Error adding tile', error: error.message });
  }
});

// GET /api/tiles/category/kitchen


// GET /api/tiles
router.get('/', async (req, res) => {
  try {
    const tiles = await Tile.find();
    res.json(tiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tiles', error: error.message });
  }
});

// DELETE /api/tiles/:id
router.delete('/:id', async (req, res) => {
  try {
    console.log('Received ID for deletion:', req.params.id);

    const tile = await Tile.findByIdAndDelete(req.params.id);
    if (!tile) {
      return res.status(404).json({ message: 'Tile not found' });
    }

    console.log('Tile deleted:', tile);

    if (tile.imageUrl) {
      // Remove the leading slash and 'uploads/' from the URL
      const filename = tile.imageUrl.replace('/uploads/', '');

      const imagePath = path.join(__dirname, '..', 'uploads', filename);

      try {
        await fs.unlink(imagePath);
        console.log('Image deleted successfully:', filename);
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
      }
    }

    res.json({ message: 'Tile and image deleted successfully' });
  } catch (error) {
    console.error('Error deleting tile:', error);
    res.status(500).json({ message: 'Error deleting tile', error: error.message });
  }
});

// PUT /api/tiles/:id
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      price,
      size,
      material,
      finish,
      color,
      category,
      isTrending,
      isFastSelling
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const tile = await Tile.findById(req.params.id);
    if (!tile) {
      return res.status(404).json({ message: 'Tile not found' });
    }

    let imageUrl = tile.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    tile.name = name;
    tile.shortDescription = shortDescription;
    tile.description = description;
    tile.price = price;
    tile.size = size;
    tile.material = material;
    tile.finish = finish;
    tile.color = color;
    tile.category = category;
    tile.imageUrl = imageUrl;
    tile.isTrending = isTrending === 'true';
    tile.isFastSelling = isFastSelling === 'true';

    await tile.save();

    res.json({ message: 'Tile updated successfully', tile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tile', error: error.message });
  }
});

// GET /api/tiles/:id
router.get('/:id', async (req, res) => {
  try {
    const tileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(tileId)) {
      return res.status(400).json({ message: "Invalid tile ID" });
    }

    const tile = await Tile.findById(tileId);
    if (!tile) {
      return res.status(404).json({ message: 'Tile not found' });
    }
    res.json(tile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tile', error: error.message });
  }
});







// GET /api/tiles/category/outdoor



// GET /api/tiles/category/kitchen/colors


// --------- Export router ---------
module.exports = router;
