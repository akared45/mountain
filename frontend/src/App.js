import './App.css';
import RouterApp from './routes/router';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <RouterApp></RouterApp>
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
    </div>
  );
}

export default App;
