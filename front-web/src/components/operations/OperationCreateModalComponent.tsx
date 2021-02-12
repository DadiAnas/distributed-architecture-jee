import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Modal, Button, Select } from "antd";
import { addOne, fetchAll } from "../../redux/actions/models";
import "../../../node_modules/antd/dist/antd.css";
import MultipleInputSelect from "../MultipleInputSelect";
import { useForm } from "react-hook-form";
import "../css/OperationCreateModalStyle.css";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function OperationCreateModalComponent({ showModal, visible }: any) {
  const [form] = Form.useForm();
  const { register, handleSubmit, errors } = useForm();
  const [operations, setOperations] = useState({});
  const [category, setClient] = useState({});
  const dispatch = useDispatch();
  const clients = useSelector((state: any) => state.models["clients"]);

  function handleAddClients() {
    setOperations((operations) => ({
      ...operations,
      clients: clients?.map((f: any) => ({ id: f.value })),
    }));
    setClient(clients?.map((cat: any) => ({ id: cat.value })));
  }
  useEffect(() => {
    dispatch(fetchAll("clients"));
  }, []);

  const addOperation = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(addOne("operations", operations));
        showModal(false);
      })
      .catch((error) => {
        return;
      });
  };
  const onSubmit = (data: any) => {
    console.log("image", data.image[0].name);
    setOperations({ ...operations, picture: data.image[0].name });
  };

  return (
    <Modal
      title="Add operation "
      visible={visible}
      onCancel={() => showModal(false)}
      forceRender={true}
      footer={[
        <Button form="myForm" key="creer" onClick={addOperation}>
          Add
        </Button>,
        <Button key="cancel" htmlType="button" onClick={() => showModal(false)}>
          cancel
        </Button>,
      ]}
    >
      <Form {...layout} form={form} id="myForm" name="control-hooks">
        <Form.Item label="Picture">
          <Input
            type="file"
            onChange={handleSubmit(onSubmit)}
            name="image"
            className="operation-input-image"
          />
          {errors.name && errors.name.type === "required" && (
            <span>This is required</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </Form.Item>
        <Form.Item label="Designation" rules={[{ required: true }]} required>
          <Input
            type="text"
            onChange={(e) => {
              e.persist();
              setOperations({ ...operations, designation: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            type="text"
            onChange={(e) => {
              e.persist();
              setOperations({ ...operations, description: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="price" rules={[{ required: true }]} required>
          <Input
            type="text"
            onChange={(e) => {
              e.persist();
              setOperations({
                ...operations,
                price: parseFloat(e.target.value),
              });
            }}
            required
          />
        </Form.Item>
        <Form.Item name="clients" label="Client(s)">
          <MultipleInputSelect
            values={clients}
            placeHolder="select client"
            key="id"
            title="designation"
            handleChange={handleAddClients}
          />
        </Form.Item>
        <Form.Item {...tailLayout}></Form.Item>
      </Form>
    </Modal>
  );
}

export default OperationCreateModalComponent;
