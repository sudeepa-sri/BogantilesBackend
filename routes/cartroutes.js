const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Assuming you have the Cart model
// Assuming you have a Cart model with userId and tiles: [{ tileId, quantity }]
router.post('/', async (req, res) => {
    const { userId, tileId, quantity } = req.body;
  
    if (!userId || !tileId || !quantity) {
      return res.status(400).json({ message: 'userId, tileId, and quantity are required.' });
    }
  
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive integer.' });
    }
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, tiles: [{ tileId, quantity }] });
      } else {
        const tileExists = cart.tiles.find(item => item.tileId.toString() === tileId);
  
        if (tileExists) {
          return res.status(200).json({ message: 'Tile already in cart, not incremented' });
        }
  
        cart.tiles.push({ tileId, quantity });
      }
  
      await cart.save();
      res.status(200).json({ message: 'Tile added to cart successfully', cart });
    } catch (err) {
      console.error('Error updating cart:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// View Cart route
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('tiles.tileId');
    
    // Check if cart exists for the user
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// Update Cart route
router.put('/:userId', async (req, res) => {
  try {
    const { tileId, quantity } = req.body;

    if (!tileId || !quantity) {
      return res.status(400).json({ message: 'tileId and quantity are required.' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive integer.' });
    }

    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const tileIndex = cart.tiles.findIndex(item => item.tileId.toString() === tileId);

    if (tileIndex === -1) {
      return res.status(404).json({ message: 'Tile not found in cart' });
    }

    // Update the quantity of the tile
    cart.tiles[tileIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();
    res.json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

// Remove from Cart route
router.delete('/:userId/:tileId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const tileIndex = cart.tiles.findIndex(item => item.tileId.toString() === req.params.tileId);

    if (tileIndex === -1) {
      return res.status(404).json({ message: 'Tile not found in cart' });
    }

    // Remove the tile from the cart
    cart.tiles.splice(tileIndex, 1);
    await cart.save();

    res.json({ message: 'Tile removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing tile from cart', error: error.message });
  }
});


// Assuming you have a Cart model with userId and tiles: [{ tileId, quantity }]
router.post('/api/cart', async (req, res) => {
  const { userId, tileId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        tiles: [{ tileId, quantity }],
      });
    } else {
      // Check if tile already exists
      const tileExists = cart.tiles.find((item) => item.tileId.toString() === tileId);

      if (tileExists) {
        return res.status(200).json({ message: 'Tile already in cart, not incremented' });
      }

      cart.tiles.push({ tileId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Tile added to cart' });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
