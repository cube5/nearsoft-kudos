import gql from "graphql-tag";

const STATUS = process.env.NODE_ENV === "development" ? "DRAFT" : "PUBLISHED";

export default gql`
query kudos($filter: String) {
    kudoes(
      first: 25
      where: {
        status: ${STATUS}
        OR: [
          { to_contains: $filter }
          { from_contains: $filter }
          { message_contains: $filter }
        ]
      },
      orderBy: createdAt_DESC
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
