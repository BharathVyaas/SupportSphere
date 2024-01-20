import React from "react";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet";

function Home() {
  return <Outlet />;
}

export default Home;

// Helmet code for website
export function IndexHelmet() {
  return (
    <Helmet>
      <title>SupportSphere - Connecting Communities, Supporting Causes</title>
      <meta
        name="description"
        content="Join SupportSphere in making a positive impact! Connect communities and support causes for a better tomorrow."
      />
      <meta
        name="Bharath Vyaas"
        content="SupportSphere, fundraising, community, support, causes, campaigns"
      />
      <meta name="author" content="Bharath Vyaas" />
    </Helmet>
  );
}
