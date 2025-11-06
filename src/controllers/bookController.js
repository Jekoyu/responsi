const bookService = require('../services/bookService');

class BookController {
  async create(req, res) {
    try {
      const { name, author, description, publisher, publishedYear } = req.body;

      // Validate required fields
      if (!name || author === undefined) {
        
        return res.status(400).json({
          success: false,
          message: 'Name and author are required'
        });
      }

      const data = await bookService.create(
        { name, author, description, publisher, publishedYear },
      );

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const products = await bookService.getAll(req.user.userId);

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

  async getById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.getById(id, req.user.userId);

      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.update(
        id,
        req.body,
      );

      res.json({
        success: true,
        message: 'Book updated successfully',
        data: book
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await bookService.delete(id, req.user.userId);

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

module.exports = new BookController();