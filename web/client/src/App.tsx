// src/App.tsx
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import Router from "preact-router";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import NotFound from "./pages/NotFound/NotFound";
import Info from "./pages/Info/Info";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Thanks from "./pages/Thanks/Thanks";
import Feedback from "./pages/Feedback/Feedback";
import Career from "./pages/Career/Career";
import BlogPage from "./pages/Blog/Blog";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import ProductPage from "./pages/Product/Product";
import Quiz from "./pages/Quiz/Quiz";

import Cur from "./components/Cur/Cur";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Layout from "./containers/Layout/Layout";

import "./App.scss";
import Kitchen3D from "./pages/Kitchen3D/Kietchen3D";

const App: FunctionalComponent = () => {
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () =>
      document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <div class="app">
        <Router>
          <Home path="/" searchName={searchName} />
          <Cart path="/cart" />
          <PlaceOrder path="/order" />
          <Info path="/info" />
          <PrivacyPolicy path="/policy" />
          <Thanks path="/thanks" />
          <Feedback path="/feedback" />
          <Career path="/career" />
          <BlogPage path="/blogs" />
          <BlogDetail path="/blog/:id" />
          <ProductPage path="/product/:id" />
          <Quiz path="/quiz" />
            <Kitchen3D path="/kitchen" />

          <NotFound default />
        </Router>

        <Cur />
      </div>
    </Layout>
  );
};

export default App;
