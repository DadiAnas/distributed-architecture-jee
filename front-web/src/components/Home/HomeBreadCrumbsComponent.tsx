import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, useParams, Link } from "react-router-dom";

function HomeBreadCrumbsComponent() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const { categorieId } = useParams();
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {paths.includes("operations") && (
        <Breadcrumb.Item>Operations</Breadcrumb.Item>
      )}
      {paths.includes("clients") && (
        <Breadcrumb.Item>
          <Link to={"/clients"}>Clients</Link>
        </Breadcrumb.Item>
      )}
      {paths.includes("clients") && (
        <Breadcrumb.Item>{categorieId}</Breadcrumb.Item>
      )}
      {paths.includes("settings") && (
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default HomeBreadCrumbsComponent;
