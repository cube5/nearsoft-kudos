import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "react-apollo/test-utils";

import Kudo from "./Kudo";
import Container from "../Container";
import Home from "../../containers/Home";
import Kudos from "../../containers/Kudos";
import mocks from "../../test/mocks";

storiesOf("Pages", module)
  .add("Home", () => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
  })
  .add("Kudos", () => {
    return (
      <MockedProvider mocks={mocks}>
        <Kudos />
      </MockedProvider>
    );
  });

storiesOf("Kudo", module).add("Kudo", () => {
  return (
    <Container>
      <Kudo onChange={action("changed text")} />
    </Container>
  );
});
