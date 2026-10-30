"use client";

import React, { useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { formatPrice } from "@/utils/price";
import { fetchProducts } from "@/utils/products";
import { EachProduct, SortConfigType } from "@/utils/type";

const AdminPage = () => {
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  const fetchItems = () => {
    setProductsLoading(true);
    fetchProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((e: Error) => {
        console.log("err", e);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [products, setProducts] = useState<Array<EachProduct>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<EachProduct>({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });
  const [selectedProductId, setSelectedProductId] = useState<number>(null);
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    key: null,
    direction: "asc",
  });

  const handleSort = (column: string) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedProducts = [...products].sort((a, b) => {
      if (column === "price" || column === "id") {
        return direction === "asc"
          ? a[column] - b[column]
          : b[column] - a[column];
      } else {
        return direction === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
    });

    setProducts(sortedProducts);
    setSortConfig({ key: column, direction });
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const productToEdit = products.find(
      (product) => product.id === selectedProductId
    );
    setNewProduct(productToEdit);
    setOpenModal(true);
    handleMenuClose();
  };

  const handleRemove = () => {
    setProducts(products.filter((product) => product.id !== selectedProductId));
    handleMenuClose();
  };

  const handleAddProductClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleAddProduct = () => {
    if (selectedProductId) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProductId
          ? { ...product, ...newProduct }
          : product
      );
      setProducts(updatedProducts);
    } else {
      const newProductData = { ...newProduct, id: products.length + 1 };
      setProducts([...products, newProductData]);
    }
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    });
    setSelectedProductId(null);
    setOpenModal(false);
  };

  return (
    <Container maxWidth="xl">
      <h1>Admin Page</h1>
      <Button
        data-testid="add-product-button"
        variant="contained"
        color="primary"
        onClick={handleAddProductClick}
      >
        Add Product
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                data-testid="id-header"
                onClick={() => handleSort("id")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                ID{" "}
                {sortConfig.key === "id"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                data-testid="title-header"
                onClick={() => handleSort("title")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Title{" "}
                {sortConfig.key === "title"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                data-testid="category-header"
                onClick={() => handleSort("category")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Category{" "}
                {sortConfig.key === "category"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                data-testid="price-header"
                onClick={() => handleSort("price")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Price{" "}
                {sortConfig.key === "price"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                data-testid="description-header"
                onClick={() => handleSort("description")}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Description{" "}
                {sortConfig.key === "description"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                Image{" "}
                {sortConfig.key === "image"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>
                  <IconButton
                    data-testid="menu-button"
                    onClick={(event) => handleMenuClick(event, product.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem data-testid="edit-option" onClick={handleEdit}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      data-testid="remove-option"
                      onClick={handleRemove}
                    >
                      Remove
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleModalClose} data-testid="modal">
        <Box
          sx={{
            width: 400,
            margin: "100px auto",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <h2>{selectedProductId ? "Edit Product" : "Add Product"}</h2>
          <TextField
            data-testid="modal-title"
            label="Title"
            fullWidth
            margin="normal"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <TextField
            data-testid="modal-category"
            label="Category"
            fullWidth
            margin="normal"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <TextField
            data-testid="modal-price"
            label="Price"
            fullWidth
            margin="normal"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            data-testid="modal-description"
            label="Description"
            fullWidth
            margin="normal"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <TextField
            data-testid="modal-image"
            label="Image URL"
            fullWidth
            margin="normal"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <Button
            data-testid="modal-submit-btn"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddProduct}
            sx={{ marginTop: 2 }}
          >
            {selectedProductId ? "Save Product" : "Add Product"}
          </Button>
        </Box>
      </Modal>

      {productsLoading && (
        <Modal
          open={true}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} />
        </Modal>
      )}
    </Container>
  );
};

export default AdminPage;
