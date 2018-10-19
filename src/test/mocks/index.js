import KUDOS from "../../graphql/queries/KUDOS";
import CREATE_KUDO from "../../graphql/mutations/CREATE_KUDO";
import kudosMock from "./kudos";

const createKudo = kudosMock[0];

const mocks = [
  {
    request: {
      query: CREATE_KUDO,
      variables: {
        from: createKudo.from,
        to: createKudo.to,
        message: createKudo.message,
        status: createKudo.status,
        imgUrl: createKudo.imgUrl
      }
    },
    delay: 4000,
    result: {
      data: {
        createKudo: createKudo
      }
    }
  },
  {
    request: {
      query: KUDOS
    },
    result: {
      data: {
        kudoes: kudosMock
      }
    }
  }
];

export default mocks;
