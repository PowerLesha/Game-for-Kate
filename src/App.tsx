import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import ScoreComponent from "./components/ScoreComponent";
import Kate from "./components/Kate/index";
import Info from "./components/Info";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <div className="info-container">
          {" "}
          {/* Container for Info component */}
          <ScoreComponent />
          <Info />
        </div>
        <Kate />
      </div>
    </Provider>
  );
};

export default App;
