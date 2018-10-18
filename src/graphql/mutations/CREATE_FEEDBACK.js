import gql from "graphql-tag";

export default gql`
  mutation createFeedback($message: String!, $rating: Rating!) {
    createFeedback(message: $message, rating: $rating) {
      message
      rating
    }
  }
`;
