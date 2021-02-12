import React, { useState } from "react";
import { Button } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { useDispatch } from "react-redux";
import { deleteOne } from "../../redux/actions/models";
import { BarsOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ClientsEditModalComponent from "./ClientsEditModalComponent";

function ClientsTableComponent({ comptes }: any) {
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
      title: "solde",
      dataIndex: "solde",
      key: "solde",
    },
    {
      title: "created at",
      dataIndex: "created_at",
      key: "Created_at",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "etat",
      dataIndex: "etat",
      key: "etat",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (cell, compte, index) => (
        <div className="actionButtons">
          <Button
            onClick={() => {
              setOperationToEdit(compte);
              showEditModal(true);
            }}
          >
            <EditOutlined style={{ color: "orange" }} />
          </Button>
          <Button
            danger
            onClick={() => dispatch(deleteOne("comptes", compte.id))}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={comptes || []} rowKey="id" />
      <ClientsEditModalComponent
        clientToEdit={operationToEdit}
        showModal={showEditModal}
        visible={visible}
      />
    </>
  );
}

export default ClientsTableComponent;
