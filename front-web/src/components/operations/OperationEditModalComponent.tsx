import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { fetchAll, editOne } from "../../redux/actions/models";
import MultipleInputSelect from "../MultipleInputSelect";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
function confirm(e: any) {
  message.success("Click on Yes");
}

function cancel(e: any) {
  message.error("Click on No");
}

function OperationEditModalComponent({
  visible,
  showModal,
  operationToEdit,
}: any) {
  const [loading, setLoading] = useState(false);
  const clients = useSelector((state: any) => state.models["clients"]);
  const [operations, setOperations] = useState<any>({ ...operationToEdit });
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    setOperations({ ...operationToEdit });
    form.setFieldsValue(operationToEdit); //({...operationToEdit,clients:operationToEdit.clients.map((f:any) => f.id)})
    dispatch(fetchAll("clients"));
  }, [operationToEdit]);

  function handleAddFiliere(clientsIds: number[]) {
    console.log({ clientsIds });
    setOperations((operations: any) => ({
      ...operations,
      clients: clientsIds.map((id: any) => ({ id: id.value })),
    }));
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setImage(imageUrl);
      });
    }
  };
  const { Option } = Select;
  const [image, setImage] = useState();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleEdit = () => {
    dispatch(editOne("operations", operations.id, operations));
    showModal(false);
  };
  return (
    <Modal
      forceRender
      title="Edit operation"
      visible={visible}
      onCancel={() => showModal(false)}
      footer={[
        <Button form="myForm" key="edit" htmlType="submit" onClick={handleEdit}>
          edit
        </Button>,
        <Button key="cancel" htmlType="button" onClick={() => showModal(false)}>
          cancel
        </Button>,
      ]}
    >
      <EditOutlined style={{ color: "#e8501d" }} />
      <Form {...layout} form={form} name="control-hooks" id="myForm">
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true }]}
        >
          <Input
            onChange={(e) => {
              e.persist();
              setOperations((operations: any) => ({
                ...operations,
                designation: e.target.value,
              }));
            }}
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input
            type="text"
            onChange={(e) => {
              e.persist();
              setOperations({ ...operations, description: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="price"
          rules={[{ required: true }]}
          required
        >
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
            placeHolder="Select Client"
            key="id"
            title="title"
            handleChange={handleAddFiliere}
          />
        </Form.Item>
        <Form.Item {...tailLayout}></Form.Item>
      </Form>
    </Modal>
  );
}

export default OperationEditModalComponent;
