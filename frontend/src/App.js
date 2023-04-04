import GlobalStyle from "./UI/GlobalStyle";
import AppPath from "./AppPath";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Layout>
      <GlobalStyle />
      <AppPath />
      <ToastContainer />
    </Layout>
  );
}

export default App;
