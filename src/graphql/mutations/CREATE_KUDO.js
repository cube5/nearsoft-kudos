import gql from "graphql-tag";

const STATUS = process.env.NODE_ENV === "development" ? "DRAFT" : "PUBLISHED";

export default gql`
  mutation createKudo(
    $from: String!
    $to: String!
    $message: String!
    $location: OfficeLocation!
    $imgUrl: String!
  ) {
    createKudo(
      data: {
        from: $from
        to: $to
        message: $message
        location: $location
        status: ${STATUS}
        imgUrl: $imgUrl
      }
    ) {
      id
      from
      to
      message
      location
      createdAt
      imgUrl
    }
  }
`;
