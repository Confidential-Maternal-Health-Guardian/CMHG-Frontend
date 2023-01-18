
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Util/Cookie';
import { baseUrl, refreshTokens } from '../Util/Token';

function PredictionComponent() {
  const navigate = useNavigate()

  const success = (res: string) => {

    const arr = res.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    const predictionResult = arr.join(" ");

    Modal.success({
      content: 'Your Prediction Result is: ' + predictionResult,
    });
  };

  const epsilonError = () => {
    Modal.error({
      title: 'Error',
      content: 'You exeeded the epsilon capacity.',
    });
  };

  const onFinish = async (values: any) => {
    const token = getCookie("access-token")
    if (baseUrl !== undefined) {
      const response = await fetch(baseUrl + "/predict", {
        method: 'POST',
        body: JSON.stringify({
          "age": values.age,
          "systolicBp": values.sbp,
          "diastolicBp": values.dbp,
          "bs": values.bs,
          "bodyTemp": values.bt,
          "heartRate": values.hr,
          "modelType": values.model,
          "epsilon": values.epsilon
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json()

      if (response.status === 200) {
        if (data["riskLevel"] !== null) {
          success(data["riskLevel"])
        } else {
          epsilonError()
        }
      } else if (response.status === 403) {
        refreshTokens().then((res) => {
          if (res) {
            onFinish(values)
          } else {
            navigate("/")
          }
        })
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="prediction-component-form">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "inherit" }}
      >
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your username.' }]}
        >
          <InputNumber placeholder="Age" />
        </Form.Item>

        <Form.Item
          label="SBP"
          name="sbp"
          rules={[{ required: true, message: 'Please input your Systolic Blood Pressure.' }]}
        >
          <InputNumber placeholder="Systolic Blood Pressure" />
        </Form.Item>
        <Form.Item
          label="DBP"
          name="dbp"
          rules={[{ required: true, message: 'Please input your Diastolic Blood Pressure.' }]}
        >
          <InputNumber placeholder="Diastolic Blood Pressure" />
        </Form.Item>
        <Form.Item
          label="BS"
          name="bs"
          rules={[{ required: true, message: 'Please input your Blood Sugar.' }]}
        >
          <InputNumber placeholder="Blood Sugar" />
        </Form.Item>

        <Form.Item
          label="BT"
          name="bt"
          rules={[{ required: true, message: 'Please input your Body Temperature.' }]}
        >
          <InputNumber placeholder="Body Temperature" />
        </Form.Item>

        <Form.Item
          label="HR"
          name="hr"
          rules={[{ required: true, message: 'Please input your Heart Rate.' }]}
        >
          <InputNumber placeholder="Heart Rate" />
        </Form.Item>
        <Form.Item name="epsilon" label="Epsilon Value"
          rules={[{ required: true, message: 'Please input epsilon value.' }]}>
          <Select placeholder="Epsilon Value" style={{ textAlign: "left" }}>
            <Select.Option value="0.5">0.5</Select.Option>
            <Select.Option value="1.0">1.0</Select.Option>
            <Select.Option value="1.5">1.5</Select.Option>
            <Select.Option value="2.0">2.0</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="model" label="Model"
          rules={[{ required: true, message: 'Please input model type.' }]}>
          <Select placeholder="Model Type" style={{ textAlign: "left" }}>
            <Select.Option value="dpr">Differential Private Random Forest</Select.Option>
            <Select.Option value="rf">Random Forest</Select.Option>
            <Select.Option value="dpsgd">Differential Private Stochastic Gradient Descent</Select.Option>
            <Select.Option value="sgd">Stochastic Gradient Descent</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="prediction-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default PredictionComponent;
