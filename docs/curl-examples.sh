#!/usr/bin/env bash

BASE_URL=http://localhost:3000/api/products

# Create a product
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {"en": "Summer Running Shoes"},
    "slug": {"en": "summer-running-shoes"},
    "productTypeKey": "shoe",
    "masterVariant": {"sku": "SRS-001"},
    "categoryKeys": ["running"]
  }'

# Search products
curl "$BASE_URL?q=shoes&page=1&limit=10"

# Update a product
curl -X PUT "$BASE_URL/PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "version": 1,
    "name": {"en": "Updated Running Shoes"}
  }'

# Delete a product
curl -X DELETE "$BASE_URL/PRODUCT_ID?version=2"
