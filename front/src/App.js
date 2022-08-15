import "./App.css";
import Quad2 from "./components/Quad2";
import { useEffect } from "react";
import quadStore from "./store/QuadStore";
import CntAns from "./components/CntAns";
import { observer } from "mobx-react-lite";
import QuadRes from "./components/QuadRes";
import LastAns from "./components/LastAns";

const App = observer(() => {
  useEffect(() => {
    console.log("app init");
    quadStore.Init();
    quadStore.getQuad();
  }, []);

  return (
    <div className="App">
      <CntAns cnt={quadStore.cnt} />
      <LastAns cnt={quadStore.lastAns} />
      <Quad2 />
      <QuadRes />
    </div>
  );
});

export default App;
