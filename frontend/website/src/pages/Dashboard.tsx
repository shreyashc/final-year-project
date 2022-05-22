import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

const Dashboard = () => {
  const [startupDetails, setStartupDetails] = useState<startupDetails>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getDetails = () => {
    setLoading(true);
    apiClient
      .get<startupDetails>("/startup/dashboard/")
      .then((res) => {
        setStartupDetails(res.data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error (see console)</div>;
  return <div>{JSON.stringify(startupDetails)}</div>;
};

export default Dashboard;

export interface startupDetails {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  startup: Startup;
}

export interface Startup {
  id: number;
  displayName: string;
  website: string;
  userId: number;
  contactEmail: string;
  shortDesc: string;
  amountRaised: string;
  ytURL: string;
}
