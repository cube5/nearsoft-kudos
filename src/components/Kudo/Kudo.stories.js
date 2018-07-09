import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Kudo from "./Kudo";

storiesOf("Kudo", module).add("ui", () => {
  const from = "Me";
  const to = "You";
  const message = "Hey man nice job!";

  return <Kudo from={from} to={to} message={message} />;
});
