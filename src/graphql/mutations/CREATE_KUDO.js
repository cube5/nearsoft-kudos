import gql from "graphql-tag";

export default gql`
  mutation createKudo(
    $from: String!
    $to: String!
    $message: String!
    $status: Status!
    $imgUrl: String!
  ) {
    createKudo(
      data: {
        from: $from
        to: $to
        message: $message
        status: $status
        imgUrl: $imgUrl
      }
    ) {
      id
      from
      to
      message
      createdAt
      imgUrl
    }
  }
`;
