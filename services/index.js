import { request, gql } from "graphql-request";
import absoluteUrl from "next-absolute-url";

const graphqlAPI =
  "https://api-eu-west-2.hygraph.com/v2/cl648y1kv7wpz01uk8acs8sjc/master";
console.log(graphqlAPI);
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
              id
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result;
};
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          photo {
            url
          }
          id
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          slug
          name
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(
      orderBy: createdAt_ASC
      last:3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });
  return result;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj) => {
  try {
    const result = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(result);
    return result.json();
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};
