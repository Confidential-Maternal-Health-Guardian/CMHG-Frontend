
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import { getCookie } from './Util/Cookie';

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
  const navigate = useNavigate()

  useEffect(() => {
    if (getCookie("access-token") !== undefined && getCookie("remember-user") === "true") {
      navigate("/main-page")
    }
  }, []);

  const isUserAllowed = () => {
    if (getCookie("access-token") !== undefined) {
      return true
    } else {
      return false
    }
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
          <Route path="/" element={<LoginPage setUserStatus={setUserStatus} />} />
          <Route path="register-page" element={<RegisterPage />} />
          <Route path="main-page" element={<ProtectedRoute isAllowed={isUserAllowed()} redirectPath="/">
            <MainPage />
          </ProtectedRoute>} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
