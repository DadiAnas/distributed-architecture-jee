import React, { useState } from "react";
import { Button } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { useDispatch } from "react-redux";
import { deleteOne } from "../../redux/actions/models";
import { BarsOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CategoriesEditModalComponent from "./ClientsEditModalComponent";

function CategoriesTableComponent({ categories }: any) {
  const [visible, showEditModal] = useState(false);
  const [categoryToEdit, setCategorieToEdit] = useState(null);
  const dispatch = useDispatch();

  const columns: ColumnProps<any>[] = [
    {
      title: "Clients",
      dataIndex: "name",
      key: "id",
      // width: "60%",
    },
    {
      title: "operations",
      render: (cell, category, index) => (
        <div className="actionButtons">
          <Link to={`/clients/${category.id}/operations`}>
            <Button>
              <BarsOutlined />
            </Button>
          </Link>
        </div>
      ),
    },
    {
      title: "Actions",
      render: (cell, category, index) => (
        <div className="actionButtons">
          <Button
            onClick={() => {
              setCategorieToEdit(category);
              showEditModal(true);
            }}
          >
            <EditOutlined style={{ color: "orange" }} />
          </Button>
          <Button
            danger
            onClick={() => dispatch(deleteOne("clients", category.id))}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={categories || []} rowKey="id" />
      <CategoriesEditModalComponent
        category={categoryToEdit}
        visible={visible}
        showModal={showEditModal}
      />
    </>
  );
}

export default CategoriesTableComponent;
