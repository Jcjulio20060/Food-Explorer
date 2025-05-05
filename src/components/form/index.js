import React from 'react';
import { Form, Button, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import users from '../users'; // Importa os usuários fictícios
import InputComponent from '../input'; // Componente de input personalizado

function LoginForm() {
  const [form] = useForm();

  const onFinish = (values) => {
    // Verifica se o usuário e senha estão corretos
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      message.success(`Welcome, ${user.name}!`);
    } else {
      message.error("Invalid email or password!");
    }
  };

  return (
    <Form form={form} name="login" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <InputComponent type="email" placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <InputComponent type="password" placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;