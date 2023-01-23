
import { Space, Spin } from 'antd';

function LoadingComponent() {

    return (
        <Space size="middle" className="loading-spin">
            <Spin size="large" />
        </Space>
    );
}

export default LoadingComponent;
