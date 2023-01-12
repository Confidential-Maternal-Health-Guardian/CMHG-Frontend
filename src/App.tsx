
import { Button, ConfigProvider } from 'antd';
import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: any) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {

  const [userStatus, setUserStatus] = useState(0)
  const changeUserStatus = () => {
    setUserStatus(1)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage changeUserStatus={changeUserStatus} />} />
          <Route path="register-page" element={<RegisterPage />} />
          <Route path="main-page" element={<ProtectedRoute isAllowed={userStatus === 1} redirectPath="/">
            <MainPage />
          </ProtectedRoute>} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
