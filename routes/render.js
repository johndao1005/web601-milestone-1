// pages
const createProductPage = async (req, res) => {
    res.render("../views/pages/admin/createProduct.pug");
  };
  const updateProductPage = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      res.render("../views/pages/admin/updateProduct.pug", { product: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };