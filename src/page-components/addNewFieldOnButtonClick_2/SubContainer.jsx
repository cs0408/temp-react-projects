import { Card, CardContent } from "@mui/material";
import React from "react";

const SubContainer = (props) => {
  return (
    <Card style={{ margin: "20px 0" }}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default SubContainer;
