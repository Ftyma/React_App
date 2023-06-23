import React, { useEffect, useState } from "react";
import axios from "axios";
import { StoreItem } from "../components/StoreItem";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import Navbar from "../components/Navbar";
import SelectionFilter from "../components/SelectionFilter";
import { Checkout } from "../components/Checkout";

export default function Store() {
  const [productAll, setProductAll] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(0);
  const [filterData, setFilterData] = useState<object[]>([]);

  const [loading, setLoading] = useState(true);

  const options = [
    { label: "all", value: 0 },
    { label: "Category 1", value: 1 },
    { label: "Category 2", value: 2 },
    { label: "Category 3", value: 3 },
    { label: "Category 4", value: 4 },
    { label: "Category 5", value: 5 },
  ];

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    // do function filter item
    filterProduct();
  }, [filterQuery, filterCategory]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProductAll(res.data);
      console.log("fetched products ", res.data);
    } catch (error) {
      console.error("Error fetching products ", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  const handleFilter = (e: any) => {
    setFilterQuery(e.target.value);
  };

  const handleClickCat = (e: any) => {
    setFilterCategory(e);
  };

  const filterProduct = () => {
    if (!filterCategory && !filterQuery) {
      console.log("fetch all", productAll);
      setFilterData(productAll);
      return;
    }

    const filter = productAll.filter((item: any) => {
      const queryMatch = item.product_name
        .toLowerCase()
        .includes(filterQuery.toLowerCase());
      const categoryMatch = item.category.includes(filterCategory);

      if (filterQuery && filterCategory) {
        return queryMatch && categoryMatch;
      } else if (filterQuery) {
        return queryMatch;
      } else if (filterCategory) {
        return categoryMatch;
      } else {
        return true;
      }
    });

    console.log("filter data", filter);
    setFilterData(filter);
  };

  const handleAddToCart = (productId: any) => {
    increment();
    getProductById(productId);
  };

  const addProductToCart = (product: any) => {
    axios
      .post("http://localhost:3000/carts/add-carts", product)
      .then((res) => {
        console.log("add product to cart", res.data);
        alert("Added to cart!");
      })
      .catch((error) => {
        alert("Failed to add to cart. Please try again.");
        console.log("error adding product to cart: ", error);
      });
  };

  //get selected product ID and push it to addProductToCart
  const getProductById = (productId: any) => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => {
        const productData = res.data;
        console.log("product get by ID:", productData);
        addProductToCart(productData);
      })
      .catch((error) => {
        console.log("Error: ", error.res.data);
      });
  };

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="bg-orange">
        <Navbar />
        <div className="relative border rounded-3xl bg-white w-full top-48">
          {/* Search Products*/}
          <div className="flex p-fluid flex-row mx-auto justify-between w-11/12 pt-10">
            <h1 className="text-2xl">List of Products</h1>
            <div className="flex justify-content-end">
              <span className="p-input-icon-right">
                <i className="pi pi-search" />
                <InputText
                  value={filterQuery}
                  onChange={handleFilter}
                  placeholder="Keyword Search"
                />
              </span>
            </div>
          </div>

          <SelectionFilter
            options={options}
            filterCategory={filterCategory}
            handleClickCat={handleClickCat}
          />

          {loading ? (
            <ProgressSpinner className="justify-center" />
          ) : (
            <div className="grid w-11/12 justify-center mx-auto pt-24">
              {filterData.map((item) => (
                <div key={item.id}>
                  <StoreItem product={item} />
                </div>
              ))}
              <Checkout />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
