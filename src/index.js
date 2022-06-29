import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';

const root = ReactDOM.createRoot(document.getElementById('root'));

const authService = new AuthService();
const imageUploader = new ImageUploader();
// 컴포넌트 prop인 경우 보통 대문자로 시작한다.
const FileInput = (props) => (<ImageFileInput {...props} imageUploader={imageUploader} />);

root.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput}/>
  </React.StrictMode>
);
