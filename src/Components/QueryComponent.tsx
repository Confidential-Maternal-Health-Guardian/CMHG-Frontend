
import { Button, Form, Row, Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

function QueryComponent() {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  
    return (

        <div className="query-component-form">
        <Form
          layout="inline"
          onValuesChange={onFormLayoutChange}
          size={"large"}
        >
        <Row style={{fontSize:"23px"}} id="query-row">
          <Form.Item label="SELECT" style={{paddingRight: "10px"}}>
            <Select placeholder="Aggregate Function">
              <Select.Option value="min">Min</Select.Option>
              <Select.Option value="max">Max</Select.Option>
              <Select.Option value="avg">Avg</Select.Option>
            </Select>
          </Form.Item>
          (
          <Form.Item style={{paddingLeft: "15px"}}>
            <Select placeholder= "Attributes" >
              <Select.Option value="age">Age</Select.Option>
              <Select.Option value="bodyTemp">Body Temp.</Select.Option>
              <Select.Option value="heartRate">Heart Rate</Select.Option>
            </Select>
          </Form.Item>)
          </Row>
          <Row id="query-row" style={{paddingBottom:"15px"}}><Title level={4}>FROM maternal_data_set</Title></Row>
          <Row id="query-row"><Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Row>
        </Form>
        </div>
      );
}

export default QueryComponent;
