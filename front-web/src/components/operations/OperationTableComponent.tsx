import { Button } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import {
  SearchOutlined,
  DeleteOutlined,
  BarsOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { deleteOne } from "../../redux/actions/models";
import { useDispatch, useSelector } from "react-redux";
import "../css/OperationTableStyle.css";
import { Link } from "react-router-dom";
import OperationEditModalComponent from "./OperationEditModalComponent";

function OperationTableComponent({ operations }: any) {
  const dispatch = useDispatch();
  const [visible, showEditModal] = useState(false);
  const [operationToEdit, setOperationToEdit] = useState({});

  const columns: ColumnProps<any>[] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "montant",
      dataIndex: "montant",
      key: "montant",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (cell, operation, index) => (
        <>
          <div className="actionButtons">
            {/* <Link to={`/operations/${operation.id}`}>
              <Button>
                <BarsOutlined />
              </Button>
            </Link> */}
            <Button
              onClick={() => {
                showEditModal(!visible);
                setOperationToEdit(operation);
              }}
            >
              <EditOutlined className="operation-table-EditOutlined" />
            </Button>
            <Button
              danger
              onClick={() => dispatch(deleteOne("operations", operation.id))}
            >
              <DeleteOutlined />
            </Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={operations || []} rowKey="id" />
      <OperationEditModalComponent
        operationToEdit={operationToEdit}
        showModal={showEditModal}
        visible={visible}
      />
    </>
  );
}

export default OperationTableComponent;
