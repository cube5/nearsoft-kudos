import gql from "graphql-tag";

const STATUS = process.env.NODE_ENV === "development" ? "DRAFT" : "PUBLISHED";

export default gql`
  {
    kudoes(where: { status: ${STATUS} }, orderBy: createdAt_DESC) {
      id
      from
      to
      message
      imgUrl
      createdAt
    }
  }
`;
