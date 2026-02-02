import { render } from "preact";
import App from "./App";
import "./index.scss";

// Context providers (Preact)
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";

// Apollo client (CORE – không Provider)
import clientGraphql from "./ApolloClient";

export { clientGraphql }; // dùng trực tiếp trong component khi cần

const root = document.getElementById("app");
if (!root) {
  throw new Error("Root element #app not found");
}

render(
  <AuthProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </AuthProvider>,
  root
);
