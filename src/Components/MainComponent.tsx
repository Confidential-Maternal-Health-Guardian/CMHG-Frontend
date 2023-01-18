
import Title from 'antd/es/typography/Title';
import {
  SearchOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

function MainComponent() {
  return (
    <div className="main-component">

      <Title className="main-component-titles" level={3}> Welcome to Confidential Maternal Health Guardian!</Title>
      <Title className="main-component-titles" level={3}> In this project, we aim to inform user about their maternal health status by providing two statistics: </Title>
      <Title className="main-component-titles" level={4}>
        <DatabaseOutlined /> <p style={{ paddingLeft: "7px" }}>Query tab is for displaying query results about maternal health,
          meanwhile, protecing the privacy of users.</p>
      </Title>
      <Title className="main-component-titles" level={4}>
        <SearchOutlined /> <p style={{ paddingLeft: "7px" }}>Prediction tab is for making prediction about users maternal health risk
          using our machine learning model.</p> </Title>
    </div>
  );
}

export default MainComponent;
