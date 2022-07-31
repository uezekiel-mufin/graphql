// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const GRAPHCMS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTkyMTU3NjUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2w2NDh5MWt2N3dwejAxdWs4YWNzOHNqYy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYjZhNDQzNDAtNmE2ZC00ZDhiLWIzMTUtZDFhYTI0MGQxODg5IiwianRpIjoiY2w2OGU4NXoyY2ZoMDAxdWtkNDdwOGcwcSJ9.2jZWu02UY5wZXyLxkzk_JutabIOEJeem-gEea3ZXbneBTqexGLzOZdMa3xwQX400LP-fCVZ5ROu5pdsx0-GObUVrXIVPExsCnWeQ71uWDVBuGtW9GB1RhPKwMafyc98ICacMPYZ1i2eRabb3NLjhZkrQHV4-lw6SM6VTmPbrJ-Ze4GFSUKgswlj5ozJrCKLOo6udYF9ZWnsC3bhC7HeTZY4cBzQQAIZKiOkv1mQtTsS--dKOttCFSSxickcOtNJv_QsPl6-EwXFT1L5r1BKh0Q2ClgK7dun758gXqbJ7EiKR7N0DpIDav8mRXleHvKKdQxFdOb3AI5A7Rw-nRmcgiZgzkVWeWg0Lmyr9jX7PKsHxK7787eJuOqFpnMzddYHs4B62vmQkFwjAufHTpV618ddUjCyomHsiuQo-TtKla_tm2pXvVqGyY6myhNLdShilwh6L4zKJIJrrJ-DXfAwKpbmGoDmA9lJeqCIKbZ38Zn6qxnlIzuoTsZ4OCLjakLHE2MdIZSVR1LCzfPaZaCZOnAivOtLn-U0mFlKSM8DWKDCuoFDf0qJ3PsxTVKk7vWtq5zr7kxc9K3iJZGXgYG4VfDxPldyxLsMJbwYRirm8z-_MsGPEcVd_o6GzmvRRo67bXZD2zOGzG4y9F0MVvJC5smpb-SwpbHC03InaFGXOMYY";

console.log(GRAPHCMS_TOKEN);

export default async function comments(res, req) {
  const graphQLClient = new GraphQLClient(
    "https://api-eu-west-2.hygraph.com/v2/cl648y1kv7wpz01uk8acs8sjc/master",
    {
      headers: {
        authorization: `Bearer ${GRAPHCMS_TOKEN}`,
      },
    }
  );

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}
