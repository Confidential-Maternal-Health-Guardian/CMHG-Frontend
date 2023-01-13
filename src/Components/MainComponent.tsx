
import Title from 'antd/es/typography/Title';

function MainComponent() {
  return (
    <div className="main-component">
      <Title className="main-component-titles" level={2}> About Us </Title>
      <Title className="main-component-titles" level={3}> Project Summary </Title>
      <Title className="main-component-titles" level={4}> How to use </Title>
    </div>
  );
}

export default MainComponent;
