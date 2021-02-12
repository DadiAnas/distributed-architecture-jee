import React, { useEffect, useState } from "react";
import { fetchAll } from "../redux/actions/models";
import { useDispatch, useSelector } from "react-redux";
import HomeLayoutComponent from "../components/Home/HomeLayoutComponent";
import PlusButton from "../components/svgs/PlusButton";
import OperationCreateModalComponent from "../components/operations/OperationCreateModalComponent";
import "../components/css/operations.css";
import OperationTableComponent from "../components/operations/OperationTableComponent";

function OperationsPage() {
  const [visible, showModal] = useState(false);
  const dispatch = useDispatch();
  const operations: any = useSelector(
    (state: any) => state.models["operations"]
  );
  useEffect(() => {
    dispatch(fetchAll("operations"));
  }, []);

  return (
    <HomeLayoutComponent>
      <div className="site-card-wrapper">
        {operations && <OperationTableComponent operations={operations} />}
      </div>
      <div className="footer">
        <PlusButton showModal={() => showModal(!visible)} />
      </div>
      <OperationCreateModalComponent visible={visible} showModal={showModal} />
    </HomeLayoutComponent>
  );
}

export default OperationsPage;

{
  /* <Row gutter={[48, 24]}>
          {operations &&
            operations.map((operations: any) => (
              <Col
                key={operations.id}
                className="gutter-row"
                sm={24}
                md={12}
                lg={8}
                xl={8}
              >
                { <OperationCardComponent {...operations} /> }
              </Col>
            ))}
        </Row> */
}
