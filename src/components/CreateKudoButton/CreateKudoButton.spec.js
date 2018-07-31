import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import Button from "@material-ui/core/Button";

import CreateKudoButton, { CREATE_KUDO } from "./CreateKudoButton";

const waait = millis => new Promise(resolve => setTimeout(resolve, millis));

const kudoMock = {
  from: "Fulanito",
  to: "Perenganito",
  message: "This is a message",
  imgUrl: "nourl"
};

const mocks = [
  {
    request: {
      query: CREATE_KUDO,
      variables: kudoMock
    },
    result: {
      data: {
        createKudo: {
          _id: "1",
          createdAt: new Date(),
          ...kudoMock
        }
      }
    }
  }
];

it("renders without error", () => {
  renderer.create(
    <MockedProvider mocks={[]} addTypename={false}>
      <CreateKudoButton variables={kudoMock} />
    </MockedProvider>
  );
});

it("shows loading state properly", () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateKudoButton variables={kudoMock} />
    </MockedProvider>
  );

  const button = component.root.findByType(Button);
  button.props.onClick();

  expect(button.props.children).toContain("saving");
});

it("shows completed state properly", async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateKudoButton variables={kudoMock} />
    </MockedProvider>
  );

  const button = component.root.findByType(Button);
  button.props.onClick();

  /*
  It delays until the next “tick” of the event loop, and allows time for that Promise returned from MockedProvider to be fulfilled.
  */
  await waait(0);

  expect(button.props.children).toContain("saved");
});
