import React from "react";
import { Pagination, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {
  const array = [...Array(pages).keys()];
  return (
    <Pagination>
      {array.map((x) => (
        <LinkContainer
          to={{
            pathname: "/listGame",
            search: `?keyword=${keyword}&page=${x + 1}`,
          }}
          key={x}
        >
          <Pagination.Item active={(x + 1).toString() === page?.toString()}>
            {x + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
