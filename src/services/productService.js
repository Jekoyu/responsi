const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ProductService {
  async createProduct(productData, userId) {
    const { name, description, price, stock } = productData;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    return product;
  }

  async getAllProducts(userId) {
    const products = await prisma.product.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return products;
  }

  async getProductById(productId, userId) {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(productId),
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async updateProduct(productId, productData, userId) {
    // Check if product exists and belongs to user
    await this.getProductById(productId, userId);

    const { name, description, price, stock } = productData;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);

    const product = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    return product;
  }

  async deleteProduct(productId, userId) {
    // Check if product exists and belongs to user
    await this.getProductById(productId, userId);

    await prisma.product.delete({
      where: { id: parseInt(productId) }
    });

    return { message: 'Product deleted successfully' };
  }
}

module.exports = new ProductService();