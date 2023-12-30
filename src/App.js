import test from "./assets/images/test.jpg";

import { Card } from "./ui/Card";

function App() {
  return (
    <ul className="flex flex-wrap">
      <li className="w1100:w-[25%] w800:w-[33%] w550:w-[50%] w-[100%] h-[370px] grid place-content-center">
        <Card
          id="1"
          title="This is a Funding Website, This is a Funding Website"
          img={test}
          progress="75"
          raised="20000"
          needed="2000000"
        />
      </li>

      <li className="w1100:w-[25%] w800:w-[33%] w550:w-[50%] w-[100%] h-[370px] grid place-content-center">
        <Card
          id="2"
          title="12345678901234567890123"
          img={test}
          progress="10"
          raised="20000"
          needed="2000000"
        />
      </li>
    </ul>
  );
}

export default App;
