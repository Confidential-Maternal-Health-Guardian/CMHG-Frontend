
import { Button, Form, Modal, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Util/Cookie';
import { baseUrl, refreshTokens } from '../Util/Token';

function QueryComponent() {
  const navigate = useNavigate()

  const success = (queryResult: string) => {
    Modal.success({
      content: 'Your Query Result is: ' + queryResult,
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
      const response = await fetch(baseUrl + "/query", {
        method: 'POST',
        body: JSON.stringify({
          "function": values.function,
          "field": values.field,
          "epsilon": values.epsilon
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json()

      if (response.status === 200) {
        if (data["queryResult"] !== null) {
          success(data["queryResult"])
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

  return (
    <div className="query-component-form">
      <Form
        layout="inline"
        size={"large"}
        onFinish={onFinish}
      >
        <Row>
          <Form.Item name="epsilon" label="Epsilon Value" style={{ paddingBottom: "15px" }}
            rules={[{ required: true, message: 'Please input epsilon value!' }]}>
            <Select placeholder="Epsilon Value">
              <Select.Option value="0.5">0.5</Select.Option>
              <Select.Option value="1.0">1.0</Select.Option>
              <Select.Option value="1.5">1.5</Select.Option>
              <Select.Option value="2.0">2.0</Select.Option>
            </Select>
          </Form.Item>
        </Row>
        <Row style={{ fontSize: "23px" }} id="query-row">
          <Form.Item name="function" label="SELECT" style={{ paddingRight: "10px" }}
            rules={[{ required: true, message: 'Please input aggregate function!' }]}>
            <Select placeholder="Aggregate Function">
              <Select.Option value="min">Min</Select.Option>
              <Select.Option value="max">Max</Select.Option>
              <Select.Option value="average">Avg</Select.Option>
            </Select>
          </Form.Item>
          (
          <Form.Item name="field" style={{ paddingLeft: "15px" }}
            rules={[{ required: true, message: 'Please input an attribute!' }]}>
            <Select placeholder="Attributes" >
              <Select.Option value="age">Age</Select.Option>
              <Select.Option value="bodyTemp">Body Temp.</Select.Option>
              <Select.Option value="heartRate">Heart Rate</Select.Option>
            </Select>
          </Form.Item>)
        </Row>
        <Row id="query-row" style={{ paddingBottom: "15px" }}><Title level={4}>FROM maternal_data_set</Title></Row>
        <Row id="query-row"><Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Row>
      </Form>
    </div>
  );
}

export default QueryComponent;
