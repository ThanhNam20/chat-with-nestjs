import React, { useState } from "react";
import LoadingComponent from "../components/loading.component";
const useLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <LoadingComponent /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
export default useLoader;