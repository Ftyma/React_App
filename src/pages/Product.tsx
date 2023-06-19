import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

import logo from "../assets/logo.svg";
import custom from "../css/Products.module.css";
import Sidebar from "./Sidebar";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Currency } from "./Currency";

import { ProgressSpinner } from "primereact/progressspinner";

export default function Register() {
  const [productList, setProductList] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(0);
  const [filterData, setFilterData] = useState<object[]>();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const options = [
    { label: "all", value: 0 },
    { label: "Category 1", value: 1 },
    { label: "Category 2", value: 2 },
    { label: "Category 3", value: 3 },
    { label: "Category 4", value: 4 },
    { label: "Category 5", value: 5 },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // do function filter item
    filterProduct();
  }, [filterQuery, filterCategory]);

  const fetchData = async () => {
    //const url_api = `http://localhost:5173/product.json`;

    try {
      const res = await axios.get("http://localhost:3000/products");
      //const data = res.data;

      const mapData = await res.data.map((item: any) => {
        const prod = {
          id: item.id,
          sku: item.sku,
          product_name: item.product_name,
          description: item.description,
          price: item.price,
          image: item.image,
          group_id: item.group_id,
          category: item.category,
        };
        return prod;
      });

      console.log("fetch data", mapData);
      await sessionStorage.setItem("product", JSON.stringify(mapData));
      await setProductList(mapData);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const onClickAdd = () => {
    setCount(count + 1);
  };

  const handleFilter = (e: any) => {
    setFilterQuery(e.target.value);
  };
  const handleClickCat = (e: any) => {
    setFilterCategory(e);
  };

  // const filterProducts = productList.filter((item: any) => {
  //   if (filterCategory === "all") {
  //     return true;
  //   } else {
  //     return item.category.some((category: any) => category === filterCategory);
  //   }
  // });

  // const filterProduct = () => {
  //   // filterCategory;

  //   const filter = productList.filter(
  //     (item: any) =>
  //       item.product_name.toLowerCase().includes(filterQuery.toLowerCase()) &&
  //       item.category.includes(filterCategory)
  //   );
  //   console.log("filter data", filter);
  //   setFilterData(filter);
  // };

  const filterProduct = () => {
    if (!filterCategory && !filterQuery) {
      console.log("fetch all", productList);
      //const item = sessionStorage.getItem("product");
      //setFilterData(JSON.parse(item));
      setFilterData(productList);
      return;
    }

    const filter = productList.filter((item: any) => {
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

  const handleItemClick = (item: any) => {
    setLoading(true);
    setSelectedProduct(item);
    setShowDialog(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const cardFooter = (price: number, showProductButton: boolean) => (
    <div className="flex justify-between">
      <span>
        <p className={`text-lg text-orange`}> {Currency(price)}</p>
        <p className=" opacity-50 line-through">{Currency(price)}</p>
      </span>
      {showProductButton && (
        <Button
          icon="pi pi-plus"
          className={`${custom.productAddButton}`}
          onClick={onClickAdd}
        ></Button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex bg-orange w-screen h-screen">
        <div className="fixed bg-orange w-full z-2">
          <Sidebar />
          <img src={logo} className="mx-auto w-3/12 h-50" />
        </div>

        <div className="bg-white w-full h-full rounded-3xl mt-44">
          <div className="flex p-fluid flex-row mx-auto justify-between w-11/12 pt-10">
            <h1 className="text-2xl">List of Products</h1>
            {/* Search Products*/}
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

          {/* Selection Filter */}
          <div>
            {options.map((option, i) => (
              <Button
                key={i}
                value={filterCategory}
                onClick={() => handleClickCat(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Product Card */}
          <div className="grid mx-auto mt-8 w-11/12 pb-32">
            {loading ? (
              <ProgressSpinner className="justify-center" />
            ) : (
              <>
                {filterData?.map((item: any) => (
                  <div className="col-6 md:col-6 lg:col-3" key={item.id}>
                    <Card
                      footer={cardFooter(item.price, true)}
                      className="border rounded-2xl"
                    >
                      <img
                        src={item.image}
                        className="w-48 h-48 mx-auto"
                        onClick={() => {
                          handleItemClick(item);
                        }}
                      />
                      <h1 className={`text-xl ${custom.productText}`}>
                        {item.product_name}
                      </h1>
                      <p className={`${custom.productDescText}`}>
                        {item.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="fixed bottom-0 bg-white w-full border py-3">
            <div className=" flex justify-center">
              <Button
                className={`w-10/12 justify-center ${custom.bottomButton} `}
              >
                Checkout
                <div className="flex flex-row ml-3 px-3 items-center bg-amber-300 rounded-xl bg-opacity-30">
                  <i className="pi pi-shopping-cart pr-2"></i>
                  <p>{count}</p>
                </div>
              </Button>
            </div>
          </div>

          {selectedProduct && showDialog && (
            <div>
              <Dialog visible={showDialog} onHide={() => setShowDialog(false)}>
                {loading ? (
                  <div className="flex w-96 h-64">
                    <ProgressSpinner className="justify-center" />
                  </div>
                ) : (
                  <>
                    <div className="grid">
                      <div className="col-6 md:col-6">
                        <img
                          src={selectedProduct.image}
                          className="w-52 mx-auto"
                        />
                      </div>
                      <Card
                        footer={cardFooter(selectedProduct.price, false)}
                        className={`col-6 md:col-6 border ${custom.popupCard} `}
                      >
                        <p className="text-lg">
                          {selectedProduct.product_name}
                        </p>

                        <p>{selectedProduct.description}</p>
                      </Card>
                    </div>
                    <Button
                      icon="pi pi-plus"
                      onClick={onClickAdd}
                      className={`${custom.popupButton}`}
                    >
                      Add to Cart
                    </Button>
                  </>
                )}
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
