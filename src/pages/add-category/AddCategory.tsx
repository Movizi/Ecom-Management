import "./add-category.css";
import { useMutation } from "@tanstack/react-query";
import { useRootContext } from "../../hooks/useRootContext";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { category } from "../../interface/category.interface";

function AddCategory() {
  const [form] = Form.useForm();

  const rootContext = useRootContext();

  const navigate = useNavigate();

  const mutation = useMutation(async (categoryData: category) =>
    rootContext?.fetchData(rootContext?.apiUrl + "/Category", {
      method: "post",
      data: categoryData,
    })
  );

  const onFinish = (values: category) => {
    console.log("Received values of form: ", values);
    mutation.mutate(values, {
      onSuccess: () => setTimeout(() => navigate("/portal/categories"), 1500),
      onError: (e) => console.log(e),
    });
  };

  return (
    <div className="add-category">
      <h1>Add Category</h1>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="categoryName"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your Category Name!",
            },
          ]}
        >
          <Input className="input" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input Category Description" },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item>
          <Button className="button" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            className="button"
            onClick={() => navigate("/portal/categories")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCategory;
