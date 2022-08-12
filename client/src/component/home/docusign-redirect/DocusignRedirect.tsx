import { Col, Row } from "react-bootstrap";

import DocusignVerification from "./panel/DocusignVerification";

function DocusignRedirect() {
  return (
    <div>
      <div className="m-0 p-0">
        <div className="border p-3 w-100">
          <p className="fw-semibold m-0">Docusign Verification Progress</p>
        </div>

        <Row className="my-2 p-0 me-0">
          <Col lg="8">
            <DocusignVerification />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DocusignRedirect;
