import React from "react";
import { render, fireEvent } from "react-testing-library";
import Kudo from "./Kudo";

it("onChange method is being called correctly", () => {
  const handleChange = jest.fn();
  const { getByPlaceholderText } = render(<Kudo onChange={handleChange} />);

  const inputTo = getByPlaceholderText("To");
  const to = "Fulanito";

  const inputMessage = getByPlaceholderText(/message/);
  const message = "This is a sample message";

  const inputFrom = getByPlaceholderText("From");
  const from = "Fulanito";

  const dummyEvent = jasmine.any(Object);

  inputTo.value = to;
  fireEvent.change(inputTo);

  expect(handleChange).toHaveBeenCalledWith(dummyEvent, {
    to: to,
    from: "",
    message: ""
  });

  inputFrom.value = from;
  fireEvent.change(inputFrom);

  expect(handleChange).toHaveBeenCalledWith(dummyEvent, {
    to: to,
    from: from,
    message: ""
  });

  inputMessage.value = message;
  fireEvent.change(inputMessage);

  expect(handleChange).toHaveBeenCalledWith(dummyEvent, {
    to: to,
    from: from,
    message: message
  });

  expect(handleChange).toHaveBeenCalledTimes(3);
});
