import { Card } from "../ui/Card";
import test from "../assets/images/test.jpg";

function CrowdFunding() {
  return (
    <div className="ms-[260px] flex flex-wrap">
      <div className="m-16">
        <Card
          id="1"
          title="This is my Portfolio"
          img={test}
          raised="1500"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="2"
          title="This is my Portfolio"
          img={test}
          raised="5200"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="3"
          title="This is my Portfolio"
          img={test}
          raised="2400"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="4"
          title="This is my Portfolio"
          img={test}
          raised="3600"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="5"
          title="This is my Portfolio"
          img={test}
          raised="4800"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="6"
          title="This is my Portfolio"
          img={test}
          raised="1400"
          needed="5000"
        />
      </div>
    </div>
  );
}

export default CrowdFunding;
