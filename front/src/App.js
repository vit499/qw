import "./App.css";
import quadStore from "./store/QuadStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  useEffect(() => {
    console.log("app init");
    quadStore.Init();
    quadStore.getQuad();
  }, []);

  return (
    <div className="App">{`${quadStore.a}x2 ${quadStore.b}x ${quadStore.c}`}</div>
  );
});

export default App;
