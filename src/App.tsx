import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "antd/dist/antd.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootContextProvider from "./context/RootContextProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootContextProvider>
        <RouterProvider router={router} />
      </RootContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
