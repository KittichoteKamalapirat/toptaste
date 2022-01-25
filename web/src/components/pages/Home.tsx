import { Button } from "@material-ui/core";
import React from "react";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <>
      <div>home</div>
      <Button color="primary" variant="contained">
        Submit
      </Button>
    </>
  );
};
