import React, { useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "@ant-design/compatible/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../redux/actions/models";
import { useParams } from "react-router-dom";
import { RequestQueryBuilder } from "@nestjsx/crud-request";
import HomeLayoutComponent from "../components/Home/HomeLayoutComponent";
import OperationTableComponent from "../components/operations/OperationTableComponent";
import "../components/css/OperationTableStyle.css";

function ClientOperationsPage() {
  const dispatch = useDispatch();
  const operations: any = useSelector(
    (state: any) => state.models["operations"]
  );
  const { comptesId } = useParams();
  useEffect(() => {
    const qb = RequestQueryBuilder.create();
    qb.setFilter({
      field: "comptes.id",
      operator: "$eq",
      value: comptesId,
    });
    dispatch(fetchAll("operations", qb.query()));
  }, []);

  return (
    <HomeLayoutComponent>
      <div className="search-div">
        <Input
          placeholder="Search"
          className="searchbar"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="site-card-wrapper">
        {operations && <OperationTableComponent {...operations} />}
      </div>
    </HomeLayoutComponent>
  );
}

export default ClientOperationsPage;
