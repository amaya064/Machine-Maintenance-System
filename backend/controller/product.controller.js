import Product from '../model/product.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Add product
export const addProduct = [
  upload.single('image'), // Handle image upload
  async (req, res) => {
    try {
      const { mainCategory, type, price, introduction } = req.body;

      if (!mainCategory || !type || !price || !introduction) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newProduct = new Product({
        mainCategory,
        type,
        price,
        introduction,
        image: req.file ? req.file.path : null, // Save image path
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Error adding product', error });
    }
  },
];



  // Fetch all products from the database
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Retrieve all products from the database
      res.status(200).json({ success: true, products });
    } catch (err) {
      res.status(500).json({ message: "Error fetching products", error: err });
    }
  };



  // Update product by ID
  export const updateProduct = async (req, res) => {
    try {
      const { mainCategory, type, price, weight, introduction } = req.body;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { mainCategory, type, price, weight, introduction },
        { new: true } // Return the updated product
      );
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product", error });
    }
  };
  
  

  // Delete product
export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  };
  


//getProductById
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};


  