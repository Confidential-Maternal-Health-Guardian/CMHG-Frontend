
import { Button, ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import RegisterPage from './Pages/RegisterPage';


function App() {
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
        <Route path="/" element= {<LoginPage/>} />
        <Route path="register-page" element= {<RegisterPage/>} />
        <Route path="main-page" element= {<MainPage/>} />
      </Routes>
    </div>
    </ConfigProvider>
  );
}

export default App;
