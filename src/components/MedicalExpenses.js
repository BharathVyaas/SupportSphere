import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import { queryClient, queryHadler } from "../service/campaignService";
import CFContent from "./CFContent";

function MedicalExpenses() {
  console.log("MedicalExpenses:render");

  // array of campaign objects
  const { data } = useQuery({
    queryKey: ["crowdFunding", "medicalExpenses"],
    queryFn: () => queryHadler("medicalExpenses"),
    staleTime: 3000,
  });

  return <CFContent data={data} />;
}

export default MedicalExpenses;

// MEdicalExpense code for Helmet
export function MEHelmet() {
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
        content={`http://${process.env.REACT_APP_DOMAIN}/medical-expenses`}
      />
    </Helmet>
  );
}

// Loader function of react router
export const loader = async () => {
  const data = await queryClient.fetchQuery({
    queryKey: ["crowdFunding", "medicalExpenses"],
    queryFn: () => queryHadler("medicalExpenses"),
  });

  return data;
};
