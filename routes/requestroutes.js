// // routes/request.js
// const express = require('express');
// const router = express.Router();
// const TileRequest = require('../models/TileReuest');
// const Tile = require('../models/Tile'); // Assuming you have a Tile model

// // POST route to submit a tile request
// router.post('/', async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     contactTime,
//     city,
//     locationText,
//     message,
//     taluk,
//     tiles, // This will be an array of tile objects with tileId and quantity
//   } = req.body;

//   if (!name || !email || !phone || !contactTime || !taluk || !locationText || !tiles || tiles.length === 0) {
//     return res.status(400).json({ message: 'Please fill in all required fields and include at least one tile.' });
//   }

//   try {
//     // Ensure all tiles exist in the database
//     const tileDetails = await Promise.all(
//       tiles.map(async (tile) => {
//         const tileData = await Tile.findById(tile.tileId);
//         if (!tileData) {
//           throw new Error(`Tile with ID ${tile.tileId} not found.`);
//         }
//         return { tileId: tileData._id, quantity: tile.quantity };
//       })
//     );

//     const newRequest = new TileRequest({
//       name,
//       email,
//       phone,
//       contactTime,
//       city,
//       locationText,
//       message,
//       taluk,
//       status: 'Pending', // Default status
//       requestDate: new Date(),
//       tiles: tileDetails,
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: 'Tile request submitted successfully.',
//       request: newRequest,
//     });
//   } catch (err) {
//     console.error('Error submitting request:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const TileRequest = require('../models/TileReuest');
// const Tile = require('../models/Tile'); // Assuming you have a Tile model

// // POST route to submit a tile request
// router.post('/', async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     contactTime,
//     city,
//     locationText,
//     message,
//     taluk,
//     tiles, // This will be an array of tile objects with tileId and quantity
//   } = req.body;

//   if (!name || !email || !phone || !contactTime || !taluk || !locationText || !tiles || tiles.length === 0) {
//     return res.status(400).json({ message: 'Please fill in all required fields and include at least one tile.' });
//   }

//   try {
//     // Ensure all tiles exist in the database
//     const tileDetails = await Promise.all(
//       tiles.map(async (tile) => {
//         const tileData = await Tile.findById(tile.tileId);
//         if (!tileData) {
//           return res.status(400).json({ message: `Tile with ID ${tile.tileId} not found.` });
//         }
        
//         // Additional validation for quantity
//         if (tile.quantity <= 0) {
//           return res.status(400).json({ message: `Quantity for tile ${tile.tileId} must be greater than 0.` });
//         }
        
//         return { tileId: tileData._id, quantity: tile.quantity };
//       })
//     );

//     const newRequest = new TileRequest({
//       name,
//       email,
//       phone,
//       contactTime,
//       city,
//       locationText,
//       message,
//       taluk,
//       status: 'Pending', // Default status
//       requestDate: new Date(),
//       tiles: tileDetails,
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: 'Tile request submitted successfully.',
//       request: newRequest,
//     });
//   } catch (err) {
//     console.error('Error submitting request:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
// // In routes/request.js
// router.get('/fetch', async (req, res) => {
//     try {
//       const requests = await TileRequest.find().lean();
  
//       // Fetch tile details for each request
//       for (let request of requests) {
//         request.tiles = await Promise.all(
//           request.tiles.map(async (tile) => {
//             const tileData = await Tile.findById(tile.tileId).lean();
//             if (!tileData) return tile; // If tile not found, return raw
  
//             return {
//               tileId: tile.tileId,
//               quantity: tile.quantity,
//               name: tileData.name,
//               category: tileData.category,
//               price: tileData.price,
//               imageUrl: tileData.imageUrl,
//             };
//           })
//         );
//       }
  
//       res.json(requests);
//     } catch (err) {
//       res.status(500).json({ message: 'Error fetching requests', error: err.message });
//     }
//   });
  
// // PUT /api/request/:id/status
// router.put("/:id/status", async (req, res) => {
//     const { status } = req.body;
//     try {
//       const updated = await TileRequest.findByIdAndUpdate( // Use TileRequest model
//         req.params.id,
//         { status },
//         { new: true }
//       );
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to update status" });
//     }
// });

  

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const TileRequest = require('../models/TileReuest');
// const Tile = require('../models/Tile'); 
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// // Define the upload directory
// const uploadDirectory = path.join(__dirname, 'uploads', 'request');

// // Create the directory if it doesn't exist
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// // Define multer storage and file handling
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDirectory); // Save files to the 'uploads/request' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '_' + file.originalname); // You can customize this to avoid overwriting files
//   }
// });

// // Initialize multer with storage settings
// const upload = multer({ storage: storage });

// // Example route to handle file upload

// // Assuming you have a Tile model

// // POST route to submit a tile request
// router.post('/', upload.array('images', 5), async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     contactTime,
//     city,
//     locationText,
//     message,
//     taluk,
//     tiles,
//   } = req.body;

//   if (!name || !email || !phone || !contactTime || !taluk || !locationText || !tiles) {
//     return res.status(400).json({ message: 'Please fill in all required fields and include at least one tile.' });
//   }

//   try {
//     const parsedTiles = JSON.parse(tiles);

//     const tileDetails = await Promise.all(
//       parsedTiles.map(async (tile) => {
//         const tileData = await Tile.findById(tile.tileId);
//         if (!tileData) throw new Error(`Tile with ID ${tile.tileId} not found.`);
//         if (tile.quantity <= 0) throw new Error(`Quantity for tile ${tile.tileId} must be greater than 0.`);
//         return { tileId: tileData._id, quantity: tile.quantity };
//       })
//     );

//     const referenceImages = req.files.map(file => `/uploads/request/${file.filename}`);

//     const newRequest = new TileRequest({
//       name,
//       email,
//       phone,
//       contactTime,
//       city,
//       locationText,
//       message,
//       taluk,
//       status: 'Pending',
//       requestDate: new Date(),
//       tiles: tileDetails,
//       referenceImages, // Save image paths
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: 'Tile request submitted successfully.',
//       request: newRequest,
//     });
//   } catch (err) {
//     console.error('Error submitting request:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // In routes/request.js
// router.get('/fetch', async (req, res) => {
//     try {
//       const requests = await TileRequest.find().lean();
  
//       // Fetch tile details for each request
//       for (let request of requests) {
//         request.tiles = await Promise.all(
//           request.tiles.map(async (tile) => {
//             const tileData = await Tile.findById(tile.tileId).lean();
//             if (!tileData) return tile; // If tile not found, return raw
  
//             return {
//               tileId: tile.tileId,
//               quantity: tile.quantity,
//               name: tileData.name,
//               category: tileData.category,
//               price: tileData.price,
//               imageUrl: tileData.imageUrl,
//             };
//           })
//         );
//       }
  
//       res.json(requests);
//     } catch (err) {
//       res.status(500).json({ message: 'Error fetching requests', error: err.message });
//     }
//   });
  
// // PUT /api/request/:id/status
// router.put("/:id/status", async (req, res) => {
//     const { status } = req.body;
//     try {
//       const updated = await TileRequest.findByIdAndUpdate( // Use TileRequest model
//         req.params.id,
//         { status },
//         { new: true }
//       );
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to update status" });
//     }
// });

  

// module.exports = router;

const express = require('express');
const router = express.Router();

const TileRequest = require('../models/TileReuest');
const Tile = require('../models/Tile');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// ✅ Correct path to store uploads in project root uploads/request/
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'request');

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // ✅ store in correct folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname); // Prevent name conflicts
  }
});

const upload = multer({ storage: storage });

// ✅ POST: Submit a tile request with images
router.post('/', upload.array('images', 5), async (req, res) => {
  const {
    name,
    email,
    phone,
    contactTime,
    city,
    locationText,
    message,
    taluk,
    tiles,
  } = req.body;

  if (!name || !email || !phone || !contactTime || !taluk || !locationText || !tiles) {
    return res.status(400).json({ message: 'Please fill in all required fields and include at least one tile.' });
  }

  try {
    const parsedTiles = JSON.parse(tiles);

    const tileDetails = await Promise.all(
      parsedTiles.map(async (tile) => {
        const tileData = await Tile.findById(tile.tileId);
        if (!tileData) throw new Error(`Tile with ID ${tile.tileId} not found.`);
        if (tile.quantity <= 0) throw new Error(`Quantity for tile ${tile.tileId} must be greater than 0.`);
        return { tileId: tileData._id, quantity: tile.quantity };
      })
    );

    const referenceImages = req.files.map(file => `/uploads/request/${file.filename}`);

    const newRequest = new TileRequest({
      name,
      email,
      phone,
      contactTime,
      city,
      locationText,
      message,
      taluk,
      status: 'Pending',
      requestDate: new Date(),
      tiles: tileDetails,
      referenceImages,
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Tile request submitted successfully.',
      request: newRequest,
    });
  } catch (err) {
    console.error('Error submitting request:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ GET: Fetch all tile requests with details
router.get('/fetch', async (req, res) => {
  try {
    const requests = await TileRequest.find().lean();

    for (let request of requests) {
      request.tiles = await Promise.all(
        request.tiles.map(async (tile) => {
          const tileData = await Tile.findById(tile.tileId).lean();
          if (!tileData) return tile;
          return {
            tileId: tile.tileId,
            quantity: tile.quantity,
            name: tileData.name,
            category: tileData.category,
            price: tileData.price,
            imageUrl: tileData.imageUrl,
          };
        })
      );
    }

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
});

// ✅ (Optional) Only needed if you're not using static serving
router.get('/uploads/request/:image', (req, res) => {
  const imagePath = path.join(__dirname, '..', 'uploads', 'request', req.params.image);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(imagePath);
});

// ✅ PUT: Update request status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await TileRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;

