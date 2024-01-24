import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { queryClient, queryHadler } from "../service/campaignService";
import CFContent from "./CFContent";

function EducationFunding() {
  console.log("EducationFunding:rerender");
  // array of campaign objects
  const { data } = useQuery({
    queryKey: ["crowdFunding", "educationFunding"],
    queryFn: () => queryHadler("educationFunding"),
    staleTime: 3000,
  });

  return <CFContent data={data} />;
}

export default EducationFunding;

// MEdicalExpense code for Helmet
export function EFHelmet() {
  return (
    <Helmet>
      <meta name="robots" content="index, follow" />
      <meta
        name="og:title"
        content="SupportSphere Medical Expenses Fundraiser"
      />
      <meta
        name="og:description"
        content="Help us raise funds for medical expenses. Join SupportSphere in making a positive impact!"
      />
      <meta
        name="keywords"
        content="medical expenses, fundraiser, support, community"
      />
      <meta name="og:type" content="article" />
      <meta
        name="og:url"
        content={`http://${process.env.REACT_APP_DOMAIN}/education-fund`}
      />
    </Helmet>
  );
}

// Loader function of react router
export const loader = async () => {
  const data = await queryClient.fetchQuery({
    queryKey: ["crowdFunding", "educationFunding"],
    queryFn: () => queryHadler("educationFunding"),
  });

  return data;
};
