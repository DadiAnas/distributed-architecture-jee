import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { addOne } from "../../redux/actions/models";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ClientsCreateModalComponent({ showModal, visible }: any) {
  const [form] = Form.useForm();
  const [client, setcategorie] = useState<any>({});
  const dispatch = useDispatch();
  const addcategorie = () => {
    dispatch(addOne("clients", client));
    form.setFieldsValue({ title: "" });
    showModal(false);
  };
  return (
    <Modal
      title="Create category "
      visible={visible}
      onCancel={() => showModal(false)}
      footer={[
        <Button key="create" form="myForm" onClick={addcategorie}>
          creer
        </Button>,
        <Button key="cancel" htmlType="button" onClick={() => showModal(false)}>
          cancel
        </Button>,
      ]}
    >
      <Form {...layout} form={form} name="control-hooks" id="myForm">
        <Form.Item name="name" label="Client Name" rules={[{ required: true }]}>
          <Input
            style={{ marginLeft: "12px" }}
            onChange={(e) => {
              e.persist();
              setcategorie((client: any) => ({
                ...client,
                name: e.target.value,
              }));
            }}
            required
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ClientsCreateModalComponent;
