import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader
} from "react-bs-datatable";

import TABLE_BODY from "./data.json";

const STORY_HEADERS = [
    {
    prop: "id",
    title: "checkbox",
    isCheckbox: true,
    },
  {
    prop: "name",
    title: "Name",
    isFilterable: true,
    isSortable: true,
  },
  {
    prop: "username",
    title: "Username"
  },
  {
    prop: "location",
    title: "Location"
  },
  {
    prop: "date",
    title: "Last Update"
  },
  {
    prop: "score",
    title: "Score",
    isSortable: true
  },
  {
    prop: "button",
    cell: (row) => (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => {
          alert(`${row.username}'s score is ${row.score}`);
        }}
      >
        Click me
      </Button>
    )
  }
];

const STORY_BODY = TABLE_BODY.map((item) => ({ ...item, button: null }));

export default function App() {
  return (
    <div className="mt-4">
    <DatatableWrapper
      body={STORY_BODY}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20]
        }
      }}
    >
      <Row className="mb-4 p-2 justify-content-between">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center mb-4 py-4">
      <Table>
        <TableHeader />
        <TableBody />
      </Table>
      </div>

      <Row className="mb-4 justify-content-center">
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
      </Row>
    </DatatableWrapper>
    </div>

  );
}
