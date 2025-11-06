const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class BookService {
  async create(bookData) {
    const { name, description, author, publisher, publishedYear } = bookData;

    const book = await prisma.book.create({
      data: {
        name,
        description,
        author,
        publisher,
        publishedYear: parseInt(publishedYear) || new Date(),
        updatedAt: new Date(),
      },
    });

    return book;
  }

  async getAll() {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return books;
  }

  async getById(bookId) {
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  }

  async update(bookId, bookData) {
    await this.getById(bookId);

    const { name, description, author, publisher, publishedYear } = bookData;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (author !== undefined) updateData.author = author;
    if (publisher !== undefined) updateData.publisher = publisher;
    if (publishedYear !== undefined)
      updateData.publishedYear = parseInt(publishedYear);

    const book = await prisma.book.update({
      where: { id: bookId },
      data: updateData,
    });

    return book;
  }

  async delete(bookId) {
   
    await this.getById(bookId);

    await prisma.book.delete({
      where: { id: bookId },
    });

    return { message: "Book deleted successfully" };
  }
}

module.exports = new BookService();
