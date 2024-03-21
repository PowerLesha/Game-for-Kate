import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import ScoreComponent from "./components/ScoreComponent";
import Kate from "./components/Kate/index";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ScoreComponent />

      <Kate />
    </Provider>
  );
};

export default App;
