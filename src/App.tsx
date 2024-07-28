import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./router/path";
import routes from "./router/routes";
import { routesRenderer } from "./router/routesRender";
import { useAuth } from "./common/contexts/authProvider/useAuth";

function App() {
  const { token } = useAuth();

  console.log(token);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routesRenderer(routes)}
          {/*  */}
          <Route path={"*"} element={<Navigate to={PATHS.FALLBACK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
