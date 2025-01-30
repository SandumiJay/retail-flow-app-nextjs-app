"use client"
import { title } from "@/components/primitives";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow, TableHeader,TableBody, Image, Badge, TableColumn, Modal, Button } from "@nextui-org/react";
import API_ENPOINTS from "../../API";

interface Product {
  sku: string;
  productName: string;
  category: string;
  intQty: number;
  cost: number;
  price: number;
  image?: string;
}

export default function InventoryPage() {
  const [viewAddItem, setViewAddItem] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const response = await axios.get(API_ENPOINTS.GET_PRODUCTS);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
<div>
  <Modal
    isOpen={viewAddItem}
    onClose={() => setViewAddItem(false)}
    title="Add New Item"
    size="lg"
    radius="sm"
    // transitionProps={{ transition: "fade", duration: 200 }}
  >
    <div style={{ padding: "5%", backgroundColor: "gray" }}>
      <h1>Add a new product</h1>
      {/* Add form for new product */}
    </div>
  </Modal>

  {/* Using div for layout */}
  <Table aria-label="Product Inventory">
    <TableHeader>
      <TableColumn style={{ textAlign: "left", width: "10%" }}>SKU</TableColumn>
      <TableColumn style={{ textAlign: "left", width: "20%" }}>Product Name</TableColumn>
      <TableColumn style={{ textAlign: "left", width: "15%" }}>Product Image</TableColumn>
      <TableColumn style={{ textAlign: "left", width: "15%" }}>Category</TableColumn>
      <TableColumn style={{ textAlign: "right", width: "10%" }}>Available Quantity</TableColumn>
      <TableColumn style={{ textAlign: "right", width: "10%" }}>Cost Price</TableColumn>
      <TableColumn style={{ textAlign: "right", width: "10%" }}>Selling Price</TableColumn>
      <TableColumn style={{ textAlign: "right", width: "10%" }}>Stock Status</TableColumn>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.sku} style={{ border: "1px solid #dee2e6" }}>
          <TableCell style={{ textAlign: "left", padding: "1em" }}>{product.sku}</TableCell>
          <TableCell style={{ textAlign: "left", padding: "1em" }}>{product.productName}</TableCell>
          <TableCell style={{ textAlign: "left", padding: "1em" }}>
            {product.image ? (
              <Image
                radius="md"
                style={{ width: "100%", maxWidth: "80px", height: "auto", border: "1px solid #dee2e6" }}
                src={product.image}
              />
            ) : (
              <Badge color="secondary">No Image</Badge>
            )}
          </TableCell>
          <TableCell style={{ textAlign: "left", padding: "1em" }}>{product.category}</TableCell>
          <TableCell style={{ textAlign: "right", padding: "1em" }}>{product.intQty}</TableCell>
          <TableCell style={{ textAlign: "right", padding: "1em" }}>${product.cost.toFixed(2)}</TableCell>
          <TableCell style={{ textAlign: "right", padding: "1em" }}>${product.price.toFixed(2)}</TableCell>
          <TableCell
            style={{
              display: "flex",
              gap: "0.5em",
              justifyContent: "flex-end",
              padding: "1em",
            }}
          >
            {product.intQty === 0 ? (
              <Badge color="danger">Out of Stock</Badge>
            ) : product.intQty < 50 ? (
              <Badge color="warning">Low in Stock</Badge>
            ) : (
              <Badge color="success">In Stock</Badge>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
  );
}