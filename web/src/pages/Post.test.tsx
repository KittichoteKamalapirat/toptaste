/* eslint-disable testing-library/no-debugging-utils */
import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/styles";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PostDocument } from "../generated/graphql";
import { theme } from "../theme";
import { UserContext } from "../util/UserContext";
import { Post } from "./Post";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: PostDocument,
      variables: {
        id: parseInt("10"),
      },
    },
    result: {
      data: {
        post: {
          __typename: "Post",
          id: 10,
          title: "Italian Restaurant @ France",
          text: "One of the most famous restaurants in France",
          textSnippet: "One of the most famous restaurants in France",
          url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
          createdAt: "1643276872384",
          updatedAt: "1643303094908",
          reviewsSum: 14,
          reviewsCounter: 5,
          reviewAvg: 2.8,
          creator: {
            id: 7,
            username: "nicha",
          },
        },
      },
    },
  },
];

describe("single restaurant page", () => {
  it("any user can see a restaurant", async () => {
    const { debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>
          <UserContext.Provider
            value={{
              currentUser: {
                id: 6,
                username: "kittishane",
                isAdmin: true,
              },
            }}
          >
            <MemoryRouter initialEntries={["/restaurant/10"]}>
              <Routes>
                <Route path="/restaurant/:id" element={<Post />} />
              </Routes>
            </MemoryRouter>
          </UserContext.Provider>
        </ThemeProvider>
      </MockedProvider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    //anyone can see the restaurant card
    const title = await screen.findByText(/italian restaurant @ france/i);
    //anyone can see the average review
    const reviewAvg = await screen.findByText(/average review/i);
    //admin can see the edit button
    const adminEdit = await screen.findByText(/edit this restaurant/i);
    //admin can see the delete button
    const adminDelete = await screen.findByText(/delete this restaurant/i);
    expect(title).toBeInTheDocument();
    expect(reviewAvg).toBeInTheDocument();
    expect(adminEdit).toBeInTheDocument();
    expect(adminDelete).toBeInTheDocument();
  });
});
