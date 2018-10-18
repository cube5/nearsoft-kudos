import gql from "graphql-tag";

export default gql`
  mutation createKudo(
    $from: String!
    $to: String!
    $message: String!
    $imgUrl: String!
    $status: Status!
  ) {
    createKudo(
      data: {
        from: $from
        to: $to
        message: $message
        imgUrl: $imgUrl
        status: $status
      }
    ) {
      id
      from
      to
      message
      imgUrl
      createdAt
    }
  }
`;
