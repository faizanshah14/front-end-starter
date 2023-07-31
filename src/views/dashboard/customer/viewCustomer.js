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

const ViewCustomer = ({ defaultColumns }) => {
  const [data, setData] = useState([defaultColumns]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setData(
      splitCamelCaseKeys([
        {
          date: "20-2-2023",
          transactionType: "Opening Balance",
          referenceNo: "op-001",
          debit: "100",
          credit: "100",
          balance: "500",
        },
        {
          date: "21-2-2023",
          transactionType: "Purchase",
          referenceNo: "p-002",
          debit: "200",
          credit: "0",
          balance: "300",
        },
        {
          date: "22-2-2023",
          transactionType: "Payment",
          referenceNo: "pay-003",
          debit: "0",
          credit: "150",
          balance: "450",
        },
        {
          date: "23-2-2023",
          transactionType: "Purchase",
          referenceNo: "p-004",
          debit: "100",
          credit: "0",
          balance: "350",
        },
        {
          date: "24-2-2023",
          transactionType: "Payment",
          referenceNo: "pay-005",
          debit: "0",
          credit: "200",
          balance: "550",
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
        {columns.map((columnName) => (
          <td key={columnName}>{row[columnName]}</td>
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
                variant="light"
                size="sm"
                className="pl-4"
                onClick={handleViewDebitModalOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
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
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showDebitModal, setShowDebitModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
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
  const handleCreditModalOpen = () => {
    console.log("called");
    setShowCreditModal(true);
  };

  const handleCreditModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowCreditModal(false);
  };
  const handleViewDebitModalOpen = () => {
    console.log("called");
    setShowDebitModal(true);
  };

  const handleViewDebitModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowDebitModal(false);
  };
  const handleViewDiscountModalOpen = () => {
    console.log("called");
    setShowDiscountModal(true);
  };

  const handleViewDiscountModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowDiscountModal(false);
  };
  const handleViewPrintModalOpen = () => {
    console.log("called");
    setShowPrintModal(true);
  };

  const handleViewPrintModalClose = () => {
    setCategory("");
    setSubCategory("");
    setShowPrintModal(false);
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
              <Row className="d-flex justify-content-between">
                <Col md="3">
                  <Button variant="light" onClick={handleViewPrintModalOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-printer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg>
                    <span className="px-2">Print</span>
                  </Button>
                </Col>
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
              <Row>
                <Card className="border-dark">
                  <Card.Header className="border-dark bg-primary d-flex justify-content-center">
                    <h3 className="text-white mx-auto mb-4">Account Summary</h3>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md="4">
                        <Form.Label>Customer Name:</Form.Label>
                        <Form.Label className="mx-4">John </Form.Label>
                      </Col>
                      <Col md="4">
                        <Form.Label>Opening Balance:</Form.Label>
                        <Form.Label className="mx-4">50.00 </Form.Label>
                      </Col>
                      <Col md="4">
                        <Form.Label>Total Sale: </Form.Label>
                        <Form.Label className="mx-4">100.00 </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <Form.Label>Total Credited: </Form.Label>
                        <Form.Label className="mx-4">140.00 </Form.Label>
                      </Col>
                      <Col md="4">
                        <Form.Label>Opening Discount:</Form.Label>
                        <Form.Label className="mx-4">10.00 </Form.Label>
                      </Col>
                      <Col md="4">
                        <Form.Label>Balance: </Form.Label>
                        <Form.Label className="mx-4">10.00 </Form.Label>
                      </Col>
                    </Row>
                    <Row></Row>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Card.Body>
        </Row>
        <Card className="card-transparent overflow-auto ">
          <Card.Header>
            <Col md="4" className="">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="itemsPerPageDropdown">
                  Add
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item type="button" onClick={handleCreditModalOpen}>
                    Credit
                  </Dropdown.Item>
                  <Dropdown.Item
                    type="button"
                    onClick={handleViewDebitModalOpen}
                  >
                    Debit
                  </Dropdown.Item>
                  <Dropdown.Item
                    type="button"
                    onClick={handleViewDiscountModalOpen}
                  >
                    Discount
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Card.Header>
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
          <Modal.Title>Add ViewCustomer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="ViewCustomer Name"
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
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
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
                  label="Opening Balance"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    defaultValue=""
                    onChange={handleCategoryChange}
                    value={category}
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="12">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Address"
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
        show={showCreditModal}
        centered
        onHide={handleCreditModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Serialized ViewCustomer</Modal.Title>
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
          <Button variant="danger" onClick={handleCreditModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade modal-xl"
        show={showDebitModal}
        centered
        onHide={handleViewDebitModalClose}
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
                <Button variant="light" className="mx-4">
                  Print Stickers
                </Button>
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
                        >
                          {" "}
                          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
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
          <Button variant="danger" onClick={handleViewDebitModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade modal-xl"
        show={showDiscountModal}
        centered
        onHide={handleViewDiscountModalClose}
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
                <Button variant="light" className="mx-4">
                  Print Stickers
                </Button>
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
                        >
                          {" "}
                          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
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
          <Button variant="danger" onClick={handleViewDiscountModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade modal-xl"
        show={showPrintModal}
        centered
        onHide={handleViewPrintModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Card>
              <Row className="d-flex justify-content-between">
                <Col md="4">
                  <Form.Label>Customer Name:</Form.Label>
                  <Form.Label className="mx-4">John </Form.Label>
                </Col>
                <Col md="4">Date:{new Date().toISOString()}</Col>
              </Row>
              <Row>
                <Col md="4">
                  <Form.Label>Email:</Form.Label>
                  <Form.Label className="mx-4">abc@gmailc.opm </Form.Label>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Form.Label>Phone : </Form.Label>
                  <Form.Label className="mx-4">098098908 </Form.Label>
                </Col>
              </Row>
            </Card>
            <Card.Body>
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
                          >
                            {" "}
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col md="3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Total Amount"
                    className="mb-3"
                  >
                  <Form.Select
                    className="nav-item form-select"
                    aria-label=".form-select-sm example"
                    id="supplierSelec21t"
                  >
                    <option href="#">GST 16 %</option>
                    <option href="#">GST 17 %</option>
                  </Form.Select>
                  </FloatingLabel>

                </Col>
                <Col md="3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Total Amount"
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
                    label="Discount"
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
                    label="Net Total"
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
            </Card.Footer>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleViewPrintModalClose}>
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
ViewCustomer.defaultProps = {
  defaultColumns: {
    date: "20-2-2023",
    "transaction Type": "Opening Balance",
    "reference No": "op-001",
    debit: "100",
    credit: "100",
    balance: "500",
  },
};

export default ViewCustomer;
