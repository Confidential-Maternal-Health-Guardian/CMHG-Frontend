
import { Button, Checkbox, Form, Input } from 'antd';

function PredictionComponent() {  
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      return (
          <div className= "prediction-component-form">
        <Form
          name="basic"
          labelCol={{ span: 8}}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{width:"inherit"}}
        >
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder= "Age"/>
          </Form.Item>
    
          <Form.Item
            label="SBP"
            name="sbp"
            rules={[{ required: true, message: 'Please input your Systolic Blood Pressure.' }]}
          >
              <Input placeholder= "Systolic Blood Pressure" />
          </Form.Item>
          <Form.Item
            label="DBP"
            name="dbp"
            rules={[{ required: true, message: 'Please input your Diastolic Blood Pressure.' }]}
          >
              <Input placeholder="Diastolic Blood Pressure"/>
          </Form.Item>
          <Form.Item
            label="BS"
            name="bs"
            rules={[{ required: true, message: 'Please input your Blood Sugar.' }]}
          >
              <Input placeholder= "Blood Sugar"/>
          </Form.Item>

          <Form.Item
            label="BT"
            name="bt"
            rules={[{ required: true, message: 'Please input your Body Temperature.' }]}
          >
              <Input placeholder="Body Temperature"/>
          </Form.Item>

          <Form.Item
            label="HR"
            name="hr"
            rules={[{ required: true, message: 'Please input your Heart Rate.' }]}
          >
              <Input placeholder="Heart Rate"/>
          </Form.Item>

          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit" className="prediction-form-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>

      );
}

export default PredictionComponent;
