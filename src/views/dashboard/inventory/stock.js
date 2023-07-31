import React, { useState, useEffect, Fragment, useMemo } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Dropdown,
  Pagination,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { splitCamelCaseKeys } from "../../../utilities/utils";

const Stock = ({ defaultColumns }) => {
  const [data, setData] = useState([defaultColumns]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setData(
      splitCamelCaseKeys([
        {
          itemId: "111111",
          sku: "SKU111",
          productName: "Samsung Galaxy S20",
          quantity: "3",
          manufacturer: "Samsung",
          modelNumber: "SM-G981U",
          storage: "128 GB",
          color: "Black",
          grade: "A+",
          purchasePrice: "800",
          salePrice: "1000",
          lotNumber: "2001",
        },
        {
          itemId: "222222",
          sku: "SKU222",
          productName: "KitchenAid Stand Mixer",
          quantity: "1",
          manufacturer: "KitchenAid",
          modelNumber: "KSM150PSER",
          storage: "N/A",
          color: "Red",
          grade: "A",
          purchasePrice: "300",
          salePrice: "400",
          lotNumber: "2002",
        },
        {
          itemId: "333333",
          sku: "SKU333",
          productName: "Levi's 501 Jeans",
          quantity: "5",
          manufacturer: "Levi's",
          modelNumber: "501",
          storage: "N/A",
          color: "Blue",
          grade: "B",
          purchasePrice: "50",
          salePrice: "80",
          lotNumber: "2003",
        },
        {
          itemId: "444444",
          sku: "SKU444",
          productName: "MAC Ruby Woo Lipstick",
          quantity: "10",
          manufacturer: "MAC",
          modelNumber: "RW001",
          storage: "N/A",
          color: "Ruby Woo",
          grade: "A+",
          purchasePrice: "20",
          salePrice: "30",
          lotNumber: "2004",
        },
        {
          itemId: "555555",
          sku: "SKU555",
          productName: "YETI Rambler 20 oz Tumbler",
          quantity: "4",
          manufacturer: "YETI",
          modelNumber: "YRAM20",
          storage: "N/A",
          color: "Stainless Steel",
          grade: "A",
          purchasePrice: "30",
          salePrice: "40",
          lotNumber: "2005",
        },
        {
          itemId: "666666",
          sku: "SKU666",
          productName: "1984 by George Orwell",
          quantity: "7",
          manufacturer: "N/A",
          modelNumber: "N/A",
          storage: "N/A",
          color: "N/A",
          grade: "A",
          purchasePrice: "10",
          salePrice: "15",
          lotNumber: "2006",
        },
        {
          itemId: "777777",
          sku: "SKU777",
          productName: "Sony WH-1000XM4 Wireless Headphones",
          quantity: "2",
          manufacturer: "Sony",
          modelNumber: "WH-1000XM4",
          storage: "N/A",
          color: "Black",
          grade: "A+",
          purchasePrice: "300",
          salePrice: "350",
          lotNumber: "2007",
        },
        {
          itemId: "888888",
          sku: "SKU888",
          productName: "Instant Pot Duo Nova Pressure Cooker",
          quantity: "6",
          manufacturer: "Instant Pot",
          modelNumber: "Duo Nova",
          storage: "6 Quart",
          color: "Silver",
          grade: "A",
          purchasePrice: "80",
          salePrice: "100",
          lotNumber: "2008",
        },
        {
          itemId: "999999",
          sku: "SKU999",
          productName: "Nike Air Max 270",
          quantity: "3",
          manufacturer: "Nike",
          modelNumber: "CD7338-004",
          storage: "N/A",
          color: "Black/Anthracite",
          grade: "A",
          purchasePrice: "120",
          salePrice: "150",
          lotNumber: "2009",
        },
        {
          itemId: "101010",
          sku: "SKU1010",
          productName: "Fenty Beauty Killawatt Highlighter",
          quantity: "8",
          manufacturer: "Fenty Beauty",
          modelNumber: "KWHLTR",
          storage: "N/A",
          color: "Trophy Wife",
          grade: "A+",
          purchasePrice: "30",
          salePrice: "45",
          lotNumber: "2010",
        },
        {
          itemId: "111111",
          sku: "SKU111",
          productName: "Samsung Galaxy S20",
          quantity: "3",
          manufacturer: "Samsung",
          modelNumber: "SM-G981U",
          storage: "128 GB",
          color: "Black",
          grade: "A+",
          purchasePrice: "800",
          salePrice: "1000",
          lotNumber: "2011",
        },
        {
          itemId: "121212",
          sku: "SKU1212",
          productName: "Roomba Robot Vacuum",
          quantity: "2",
          manufacturer: "iRobot",
          modelNumber: "Roomba 980",
          storage: "N/A",
          color: "Black",
          grade: "A",
          purchasePrice: "500",
          salePrice: "600",
          lotNumber: "2012",
        },
        {
          itemId: "131313",
          sku: "SKU1313",
          productName: "Giant Defy Advanced Pro 0 Road Bike",
          quantity: "1",
          manufacturer: "Giant",
          modelNumber: "Defy Advanced Pro 0",
          storage: "N/A",
          color: "Carbon/Red",
          grade: "A+",
          purchasePrice: "3500",
          salePrice: "4000",
          lotNumber: "2013",
        },
      ])
    );
  }, []);
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  const sortedData = () => {
    if (sortConfig.key === null) {
      return [...filteredData]; // Create a new array from the original data
    }

    const { key, direction } = sortConfig;

    return [...filteredData].sort((a, b) => {
      const valueA = a[key].toString().toLowerCase();
      const valueB = b[key].toString().toLowerCase();

      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const allColumns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);
  // const allColumns = Object.keys(memoizedData[0]);
  const columnOptions = allColumns.map((columnName) => ({
    label: columnName,
    value: columnName,
  }));

  const [columns, setColumns] = useState(allColumns);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectItem = (itemId) => {
    console.log(itemId)
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = Data_table.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const filteredData = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    console.log(filteredData);
    setFilteredData(filteredData);
  }, [data, searchTerm]);

  const renderData = () => {
    const sorted = sortedData(); // Get the sorted data

    return sorted.slice(startIndex, endIndex).map((row, index) => (
      <tr key={index}>
        {columns.map((columnName, index1) => (
          <React.Fragment key={columnName}>
            {columnName === 'select' ? (
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                />
              </td>
            ) : (
              <td>{row[columnName]}</td>
            )}
          </React.Fragment>
        ))}
        <td>
          <Row className="d-flex flex-nowrap">
            <Col md="4">
              <Button
                variant="light"
                size="sm"
                onClick={() => handleEditEntry(row.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </Button>
            </Col>
            <Col md="4">
              <Button
                variant="danger"
                size="sm"
                className="pl-4"
                onClick={() => handleDeleteEntry(row.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </Button>
            </Col>
            <Col md="4">
              <Button
                variant="light"
                size="sm"
                className="pl-4"
                onClick={handleViewStockModalOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                   <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
              </Button>
            </Col>
          </Row>
        </td>
      </tr>
    ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    paginationItems.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );

    paginationItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}{" "}
        </Pagination.Item>
      );
    }

    paginationItems.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    paginationItems.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return paginationItems;
  };
  // items per page

  const handleItemsPerPageChange = (selectedItemsPerPage) => {
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset current page when items per page changes
  };

  const handlePaginationItemClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderItemsPerPageOptions = () => {
    return [5, 10, 20, 50].map((option) => (
      <Dropdown.Item
        key={option}
        onClick={() => handleItemsPerPageChange(option)}
      >
        {option + " per page "}{" "}
      </Dropdown.Item>
    ));
  };
  // modal conffigs
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showViewStockModal, setViewShowStockModal] = useState(false);
  //add fields
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowModal(false);
  };
  const handleStockModalOpen = () => {
    setShowStockModal(true);
  };

  const handleStockModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowStockModal(false);
  };
  const handleViewStockModalOpen = () => {
    setViewShowStockModal(true);
  };

  const handleViewStockModalClose = () => {
    setCategory("");
    setSubCategory("");
    setViewShowStockModal(false);
  };




  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };
  const handleAddEntry = () => {
    const newEntry = {
      id: data.length + 100,
      category,
      "sub Category": subCategory,
    };

    setData((prevData) => [...prevData, newEntry]);
    console.log(newEntry, data);
    handleModalClose();
    console.log(data);
  };
  const handleEditEntry = (itemId) => {
    const entryToEdit = filteredData.find((row) => row.id === itemId);

    if (entryToEdit) {
      // Set the existing values of the entry to the state variables
      setCategory(entryToEdit.category);
      setSubCategory(entryToEdit.subCategory);
      setEditItemId(itemId);
      // Open the modal
      handleModalOpen();
    }
  };

  const handleDeleteEntry = (itemId) => {
    console.log("itemID", itemId);
    setData((prevData) => prevData.filter((row) => row.id !== itemId));
    setDeleteItemId(itemId);
  };
  const Data_table = [
    {
      serialNumber: "12312312312",
      productName: "Product",
      IMEI: "123123123123123",
      productType: "abc",
    },
  ];
  return (
    <Fragment>
      <Card className="card-transparent">
        <Row className="m-0 align-items-center">
          <Card.Body className="card-transparent mb-0">
            <Col md="12" className="card-header">
              <Row className="flex-row-reverse">
                <Col md="3">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-3"
                  />
                </Col>
              </Row>
              <Row className="mb-12 d-flex flex-row-reverse">
                <Col md="3">
                  <Dropdown className="w-100">
                    <Dropdown.Toggle
                      variant="primary"
                      id="dropdown-basic"
                      className="w-100"
                    >
                      Select Columns
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      {columnOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`w-100 ${
                            columns.includes(option.value) ? "bg-light" : ""
                          }`}
                          onClick={() => {
                            if (columns.includes(option.value)) {
                              setColumns(
                                columns.filter((col) => col !== option.value)
                              );
                            } else {
                              setColumns([...columns, option.value]);
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="w-100 text-capitalize mx-2">
                            {option.label}{" "}
                          </div>
                        </div>
                      ))}{" "}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="mt-4 justify-content-between">
                <Col md="4">
                <Dropdown>
                <Dropdown.Toggle variant="success" id="itemsPerPageDropdown">
                  Add
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item type="button"  onClick={handleModalOpen} >
                    Mobile
                  </Dropdown.Item>
                  <Dropdown.Item
                    type="button"
                  >
                    Accessory
                  </Dropdown.Item>
                  <Dropdown.Item
                    type="button"
                    onClick={handleStockModalOpen}
                  >
                    Stock
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </Col>
                <Col md="4" className="text-center d-flex flex-row-reverse">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="itemsPerPageDropdown">
                      {itemsPerPage}{" "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{renderItemsPerPageOptions()}</Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Card.Body>
        </Row>
        <Card className="card-transparent overflow-auto ">
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {" "}
                  {columns.map((columnName) => (
                    <th key={columnName} onClick={() => handleSort(columnName)}>
                      {columnName}{" "}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
            <Row className="m-0 align-items-center justify-content-center">
              <Col md="4">
                <Pagination>{renderPaginationItems()}</Pagination>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Card>
      <Modal
        className="modal fade modal-xl"
        show={showModal}
        centered
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="SKU"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <FloatingLabel
                  controlId="manufacturerSelect"
                  label="Manufacturer"
                >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="manufacturerSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel controlId="categorySelect" label="Category">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="categorySelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Mobile</option>
                    <option href="#">Accessory</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="subCategorySelect"
                  label="Sub category"
                >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-md example"
                    id="subCategorySelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="productTypeSelect"
                  label="Product Type"
                >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="productTypeSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <FloatingLabel
                  controlId="storageCapacitySelect"
                  label="Storage Capacity"
                >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="storageCapacitySelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">128 GB</option>
                    <option href="#">64 GB</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel controlId="gradeSelect" label="Category">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="gradeSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">A</option>
                    <option href="#">B</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel controlId="colorSelect" label="Color">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-md example"
                    id="colorSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Blue</option>
                    <option href="#">Green</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Model Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">
                <FloatingLabel
                  controlId="purchaseInput"
                  label="Purchase Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="purchaseInput"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Sale Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Upload Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="file"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade modal-xl"
        show={showStockModal}
        centered
        onHide={handleStockModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Serialized Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md="3">
                <FloatingLabel controlId="supplierSelect" label="Supplier">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="supplierSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel controlId="productSelect" label="Select Product">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="productSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Bill No."
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Ref No."
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <FloatingLabel controlId="billStatusSelect" label="Bill Status">
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="billStatusSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Date"
                  className="mb-3"
                >
                  <Form.Control
                    type="date"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Quantity"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="3">
                <FloatingLabel
                  controlId="productTypeSelect"
                  label="Product Type"
                >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="productTypeSelect"
                  >
                    <option href="#" defaultValue>
                      {" "}
                    </option>
                    <option href="#">Apple</option>
                    <option href="#">Samsung</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Scan IMEI"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Purchase Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Table
              responsive
              striped
              id="datatable1"
              className=""
              data-toggle="data-table"
            >
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Product Name</th>
                  <th>IMEI</th>
                  <th>Product Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.age}>
                    <td>{item.serialNumber}</td>
                    <td>{item.productName}</td>
                    <td>{item.IMEI}</td>
                    <td>{item.productType}</td>
                    <td>
                      {" "}
                      <Button
                        variant="danger"
                        size="sm"
                        className="pl-4"
                        onClick={() => console.log(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleStockModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade modal-xl"
        show={showViewStockModal}
        centered
        onHide={handleViewStockModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Search/IMEI"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md="6">
                <Button variant="light">Print List</Button>
                <Button variant="light" className="mx-4">Print Stickers</Button>
              </Col>
            </Row>
            <Table
              responsive
              striped
              id="datatable1"
              className=""
              data-toggle="data-table"
            >
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Serial Number</th>
                  <th>Product Name</th>
                  <th>IMEI</th>
                  <th>Product Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Data_table.map((item) => (
                  <tr key={item.age}>
                    <td>{item.serialNumber}</td>
                    <td>{item.productName}</td>
                    <td>{item.IMEI}</td>
                    <td>{item.productType}</td>
                    <td>
                      {" "}
                      <Button
                        variant="light"
                        size="sm"
                        className="pl-4"
                        onClick={() => console.log(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                      </svg>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleViewStockModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
Stock.defaultProps = {
  defaultColumns: {
    'select': 'false',
    "item Id": "121212",
    sku: "123123123",
    "product Name": "Iphone",
    quantity: "2",
    manufacturer: "apple",
    "model Number": "1010",
    storage: "128 GB",
    color: "red",
    grade: "A",
    "purchase Price": "100120",
    "sale Price": "1000",
    "lot Number": "100",
  },
};
export default Stock;
