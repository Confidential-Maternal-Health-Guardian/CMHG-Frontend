
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoadingComponent from './Components/LoadingComponent';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';
import { getCookie } from './Util/Cookie';
import { updateEpsilon } from './Util/Epsilon';
import { refreshTokens } from './Util/Token';

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
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const navigate = useNavigate()
  useEffect(() => {
    if ((getCookie("access-token") !== undefined && getCookie("remember-user") === "true")) {
      setLoading(false)
      refreshTokens().then((res) => {
        setLoading(true)
        if (res) {
          updateEpsilon().then((res) => {
            navigate("/main-page", { state: { res } })
          })
        } else {
          navigate("/")
        }
      })
    }
  }, []);

  const isUserAllowed = () => {
    if (getCookie("access-token") !== undefined) {
      return true
    } else {
      return false
    }
  }

  const loadedPage = <ConfigProvider
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
  </ConfigProvider >

  return (
    <>{loading ? loadedPage : <LoadingComponent />}</>
  );
}

export default App;
