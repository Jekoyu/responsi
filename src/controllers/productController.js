const productService = require('../services/productService');

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, price, stock } = req.body;

      // Validate required fields
      if (!name || price === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Name and price are required'
        });
      }

      const product = await productService.createProduct(
        { name, description, price, stock },
        req.user.userId
      );

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts(req.user.userId);

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id, req.user.userId);

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.updateProduct(
        id,
        req.body,
        req.user.userId
      );

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id, req.user.userId);

      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new ProductController();