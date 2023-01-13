
import { Button, Form, Modal, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import { getCookie } from '../Util/Cookie';
import { baseUrl } from '../Util/Token';

function QueryComponent() {

  const success = (queryResult: string) => {
    Modal.success({
      content: 'Your Query Result is: ' + queryResult,
    });
  };

  const error = () => {
    Modal.error({
      title: 'Error',
      content: 'You exeeded the epsilon capacity',
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
      if (data["queryResult"] !== null) {
        success(data["queryResult"])
      } else {
        error()
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
          <Form.Item name="epsilon" label="Epsilon Value" style={{ paddingBottom: "15px" }}>
            <Select placeholder="Epsilon Value">
              <Select.Option value="0.5">0.5</Select.Option>
              <Select.Option value="1.0">1.0</Select.Option>
              <Select.Option value="1.5">1.5</Select.Option>
              <Select.Option value="2.0">2.0</Select.Option>
            </Select>
          </Form.Item>
        </Row>
        <Row style={{ fontSize: "23px" }} id="query-row">
          <Form.Item name="function" label="SELECT" style={{ paddingRight: "10px" }}>
            <Select placeholder="Aggregate Function">
              <Select.Option value="min">Min</Select.Option>
              <Select.Option value="max">Max</Select.Option>
              <Select.Option value="average">Avg</Select.Option>
            </Select>
          </Form.Item>
          (
          <Form.Item name="field" style={{ paddingLeft: "15px" }}>
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
