// Admin Controllers
export const createBlog = async (req, res, next) => {
  try {
    const {} = req.body;
  } catch (error) {
    console.log("Error in createBlog controller", error.message);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in deleteBlog controller", error.message);
  }
};

export const editBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in editBlog controller", error.message);
  }
};

export const toggleFeaturedBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in toggleFeaturedBlog controller", error.message);
  }
};

// User Controllers
export const getAllBlogs = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in getAllBlogs controller", error.message);
  }
};

export const getSingleBlog = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in getSingleBlog controller", error.message);
  }
};

export const getBlogByCategory = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in getBlogByCategory controller", error.message);
  }
};

export const getFeaturedBlogs = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error in getFeaturedBlogs controller", error.message);
  }
};
