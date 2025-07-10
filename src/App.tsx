import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./components/Index";

function App() {
  const router = createBrowserRouter([{ index: true, element: <Index /> }]);

  return <RouterProvider router={router} />;
}

export default App;
