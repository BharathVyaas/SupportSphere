import { Card } from "../ui/Card";
import test from "../assets/images/test.jpg";

function CrowdFunding() {
  return (
    <div className="flex flex-wrap">
      <div className="m-16">
        <Card
          id="1"
          title="This is my Portfolio"
          img={test}
          progress="75"
          raised="2000"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="2"
          title="This is my Portfolio"
          img={test}
          progress="10"
          raised="2000"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="3"
          title="This is my Portfolio"
          img={test}
          progress="35"
          raised="2000"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="4"
          title="This is my Portfolio"
          img={test}
          progress="90"
          raised="2000"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="5"
          title="This is my Portfolio"
          img={test}
          progress="84"
          raised="2000"
          needed="5000"
        />
      </div>
      <div className="m-16">
        <Card
          id="6"
          title="This is my Portfolio"
          img={test}
          progress="29"
          raised="2000"
          needed="5000"
        />
      </div>
    </div>
  );
}

export default CrowdFunding;
