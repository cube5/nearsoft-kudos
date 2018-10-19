import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";

import CreateKudoButton from "./CreateKudoButton";
import mocks from "../../test/mocks";
import kudosMock from "../../test/mocks/kudos";

storiesOf("CreateKudoButton", module).add("CreateKudoButton", () => {
  const createKudo = kudosMock[0];
  const variables = {
    from: createKudo.from,
    to: createKudo.to,
    message: createKudo.message,
    imgUrl: createKudo.imgUrl
  };
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateKudoButton variables={variables} />
    </MockedProvider>
  );
});
