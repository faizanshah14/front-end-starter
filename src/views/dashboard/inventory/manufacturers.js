import React, {useState, useEffect, Fragment, useMemo} from 'react';
import {
    Table,
    Button,
    Form,
    Row,
    Col,
    Dropdown,
    Pagination,
    Modal,
    FloatingLabel
} from 'react-bootstrap';

import DataTable from 'react-data-table-component';
import Card from "../../../components/Card";
import { getManufacturers , createManufacturer , deleteManufacturer , getManufacturer , updateManufacturer} from '../../../services/manufacturer';

const Manufacturer = ({defaultColumns}) => {
    const [data, setData] = useState([defaultColumns])

    const [sortConfig, setSortConfig] = useState({key: null, direction: null});
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        async function fetchData() {
            const response = await getManufacturers();
            setData(response.data)
            console.log(response);
        }
        const resData = fetchData();
        console.log(resData.data)
        // setData([
        //     {
        //         "id": 1,
        //         "manufacturerName": "John Doe",
        //         "shortDescription": "john.doe@example.com",
        //         "age": 30
        //     },
        //     {
        //         "id": 2,
        //         "manufacturerName": "Jane Smith",
        //         "shortDescription": "jane.smith@example.com",
        //         "age": 25
        //     },
        //     {
        //         "id": 3,
        //         "manufacturerName": "Bob Johnson",
        //         "shortDescription": "bob.johnson@example.com",
        //         "age": 35
        //     },
        //     {
        //         "id": 4,
        //         "manufacturerName": "Alice Williams",
        //         "shortDescription": "alice.williams@example.com",
        //         "age": 28
        //     }, {
        //         "id": 11,
        //         "manufacturerName": "John Doe",
        //         "shortDescription": "john.doe@example.com",
        //         "age": 30
        //     }, {
        //         "id": 12,
        //         "manufacturerName": "Jane Smith",
        //         "shortDescription": "jane.smith@example.com",
        //         "age": 25
        //     }, {
        //         "id": 13,
        //         "manufacturerName": "Bob Johnson",
        //         "shortDescription": "bob.johnson@example.com",
        //         "age": 35
        //     }, {
        //         "id": 14,
        //         "manufacturerName": "Alice Williams",
        //         "shortDescription": "alice.williams@example.com",
        //         "age": 28
        //     }, {
        //         "id": 12,
        //         "manufacturerName": "John Doe",
        //         "shortDescription": "john.doe@example.com",
        //         "age": 30
        //     }, {
        //         "id": 22,
        //         "manufacturerName": "Jane Smith",
        //         "shortDescription": "jane.smith@example.com",
        //         "age": 25
        //     }, {
        //         "id": 23,
        //         "manufacturerName": "Bob Johnson",
        //         "shortDescription": "bob.johnson@example.com",
        //         "age": 35
        //     }, {
        //         "id": 24,
        //         "manufacturerName": "Alice Williams",
        //         "shortDescription": "alice.williams@example.com",
        //         "age": 28
        //     },
        // ])

    }, [])
    const columnsss = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];
    
    const dataaa = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };


    const handleSearch = (e) => {
        console.log(e.target.value)
        setSearchTerm(e.target.value);
    };

    const sortedData = () => {
        if (sortConfig.key === null) {
            return [...filteredData]; // Create a new array from the original data
        }

        const {key, direction} = sortConfig;

        return [...filteredData].sort((a, b) => {
            const valueA = a[key].toString().toLowerCase();
            const valueB = b[key].toString().toLowerCase();

            if (valueA < valueB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const allColumns = useMemo(() => {
        if (data?.length > 0) {
            return Object.keys(data[0]);
        }
        return [];
    }, [data]);
    // const allColumns = Object.keys(memoizedData[0]);
    const columnOptions = allColumns.map((columnName) => ({label: columnName, value: columnName}));
    const [columns, setColumns] = useState(allColumns);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(data);

    
    const [editItemId, setEditItemId] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);


    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        const filteredData = data?.filter((row) => Object.values(row).join(' ').toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(filteredData)
        setFilteredData(filteredData);
    }, [data, searchTerm]);

    const renderData = () => {
        const sorted =sortedData(); // Get the sorted data

        return sorted.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index}>
                {
                columns.map((columnName) => (
                    <td key={columnName}>
                        {
                        row[columnName]
                    }</td>
                ))
            }
                <td>
                    <Row className="d-flex flex-nowrap">
                        <Col md='2'>
                            <Button variant="light" size="sm" onClick={() => handleEditEntry(row.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </Button>
                        </Col>
                        <Col md='2'>
                        <Button variant="danger" size="sm" className='pl-4' onClick={() => handleDeleteEntry(row.id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
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

        paginationItems.push (
            <Pagination.First key="first"
                onClick={
                    () => handlePageChange(1)
                }
                disabled={
                    currentPage === 1
                }/>
        );

        paginationItems.push (
            <Pagination.Prev key="prev"
                onClick={
                    () => handlePageChange(currentPage - 1)
                }
                disabled={
                    currentPage === 1
                }/>
        );

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            paginationItems.push (
                <Pagination.Item key={pageNumber}
                    active={
                        pageNumber === currentPage
                    }
                    onClick={
                        () => handlePageChange(pageNumber)
                }>
                    {pageNumber} </Pagination.Item>
            );
        }

        paginationItems.push (
            <Pagination.Next key="next"
                onClick={
                    () => handlePageChange(currentPage + 1)
                }
                disabled={
                    currentPage === totalPages
                }/>
        );

        paginationItems.push (
            <Pagination.Last key="last"
                onClick={
                    () => handlePageChange(totalPages)
                }
                disabled={
                    currentPage === totalPages
                }/>
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
            <Dropdown.Item key={option}
                onClick={
                    () => handleItemsPerPageChange(option)
            }>
                {
                option + ' per page '
            } </Dropdown.Item>
        ));
    };
    // modal conffigs
    const [showModal, setShowModal] = useState(false);
    //add fields 
    const [manufacturerName, setManufacturerName] = useState('');
    const [shortDescription, setShortDescription] = useState('');

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setManufacturerName('')
        setShortDescription('')
        setShowModal(false);
    };
    const handleManufacturerNameChange = (e) => {
        setManufacturerName(e.target.value);
      };
      
      const handleShortDescriptionChange = (e) => {
        setShortDescription(e.target.value);
      };
      const handleAddEntry = () => {

        const newEntry = {
          id: data.length + 100,
          manufacturerName,
          shortDescription,
        };
      
        setData((prevData) => [...prevData, newEntry]);
        console.log(newEntry,data);
        handleModalClose();
        console.log(data);
      };
      const handleEditEntry = (itemId) => {
        const entryToEdit = filteredData.find((row) => row.id === itemId);
      
        if (entryToEdit) {
          // Set the existing values of the entry to the state variables
          setManufacturerName(entryToEdit.manufacturerName);
          setShortDescription(entryToEdit.shortDescription);
          setEditItemId(itemId);
          // Open the modal
          handleModalOpen();

        }
      };
    
      const handleDeleteEntry = (itemId) => {
        console.log('itemID',itemId)
        setData((prevData) => prevData.filter((row) => row.id !== itemId));
        setDeleteItemId(itemId);
      };
    return (
        <Fragment>
            <Card className="card-transparent">
                <Row className="m-0 align-items-center">
                    <Card.Body className='card-transparent mb-0'>
                        <Col md="12" className='card-header'>
                            <Row className='flex-row-reverse'>
                                <Col md='3'>
                                    <Form.Control type="text" placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="mb-3"/>
                                </Col>
                            </Row>
                            <Row className='mb-12 d-flex flex-row-reverse'>
                                <Col md='3'>
                                    <Dropdown className="w-100">
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" className="w-100">
                                            Select Columns
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="w-100">
                                            {
                                            columnOptions.map((option) => (
                                                <div key={
                                                        option.value
                                                    }
                                                    className={
                                                        `w-100 ${
                                                            columns.includes(option.value) ? 'bg-light' : ''
                                                        }`
                                                    }
                                                    onClick={
                                                        () => {
                                                            if (columns.includes(option.value)) {
                                                                setColumns(columns.filter((col) => col !== option.value));
                                                            } else {
                                                                setColumns([
                                                                    ...columns,
                                                                    option.value
                                                                ]);
                                                            }
                                                        }
                                                    }
                                                    style={
                                                        {cursor: 'pointer'}
                                                }>
                                                    <div className='w-100 text-capitalize mx-2'>
                                                        {
                                                        option.label
                                                    } </div>
                                                </div>
                                            ))
                                        } </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row className='mt-4 justify-content-between'>
                                <Col md='4'>
                                    <Button variant="success"
                                        onClick={handleModalOpen}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </Button>
                                </Col>
                                <Col md="4" className="text-center d-flex flex-row-reverse">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="itemsPerPageDropdown">
                                            {itemsPerPage} </Dropdown.Toggle>
                                        <Dropdown.Menu>{
                                            renderItemsPerPageOptions()
                                        }</Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>

                    </Card.Body>
                </Row>
                {/* <Card className='card-transparent'>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr> {
                                    columns.map((columnName) => (
                                        <th key={columnName}
                                            onClick={
                                                () => handleSort(columnName)
                                        }>
                                            {columnName} </th>
                                    ))
                                }
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{
                                renderData()
                            }</tbody>
                        </Table>
                        <Row className="m-0 align-items-center justify-content-center">
                            <Col md="4">
                                <Pagination>{
                                    renderPaginationItems()
                                }</Pagination>
                            </Col>
                        </Row>
                    </Card.Body>

                </Card> */}
                <DataTable
            columns={columnsss}
            data={dataaa}
            pagination
            sortIcon
            dense
        />
            </Card>
            <Modal className='modal fade '
                show={showModal}
                centered
                onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Manufacturer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        >
                        <Row className="mb-3">
                            <Col md="12">
                                <FloatingLabel controlId="floatingInput" label="Manufacturer Name" className="mb-3">
                                <Form.Control type="text" defaultValue=""  onChange={handleManufacturerNameChange} value={manufacturerName}  required/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md="12">
                                <FloatingLabel controlId="floatingInput" label='Short Description'  className="mb-3" >
                                <Form.Control as="textarea" defaultValue="" rows={3} onChange={handleShortDescriptionChange} value={shortDescription} required/>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger"
                        onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"
                        onClick={handleAddEntry}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
Manufacturer.defaultProps = {
    defaultColumns: {
        name: "John Doe",
        description: "john.doe@example.com"
    }
};
export default Manufacturer;
