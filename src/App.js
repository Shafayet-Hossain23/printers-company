
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { routes } from '././Routes/Routes';

function App() {
  const router = routes
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
