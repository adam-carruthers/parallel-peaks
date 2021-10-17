import userReducer, { login, setUser, logout } from "./userSlice";

describe("the user reducer", () => {
  test("should initialize to null", () => {
    expect(userReducer(undefined, { type: "fake action" })).toEqual(null);
  });
  test("should handle a login action correctly", () => {
    expect(
      userReducer(
        null,
        login({
          token: "tokenabcdefg",
          user: {
            id: 13,
            username: "maxymoo",
            email: "someemail@gmail.com",
            is_staff: false,
            is_matcher: false,
            is_moderator: false,
            first_name: "",
            last_name: "",
            matching_entry: null,
          },
        })
      )
    ).toEqual({
      id: 13,
      username: "maxymoo",
      email: "someemail@gmail.com",
      is_staff: false,
      is_matcher: false,
      is_moderator: false,
      first_name: "",
      last_name: "",
      matching_entry: null,
      token: "tokenabcdefg",
    });
  });
  test("should handle a setUser action correctly", () => {
    expect(
      userReducer(
        {
          id: 13,
          username: "maxymoo",
          email: "someemail@gmail.com",
          is_staff: false,
          is_matcher: false,
          is_moderator: false,
          first_name: "",
          last_name: "",
          matching_entry: null,
          token: "tokenabcdefg",
        },
        setUser({
          id: 13,
          username: "maxymoo",
          email: "someemail@gmail.com",
          is_staff: true,
          is_matcher: true,
          is_moderator: true,
          first_name: "",
          last_name: "",
          matching_entry: null,
        })
      )
    ).toEqual({
      id: 13,
      username: "maxymoo",
      email: "someemail@gmail.com",
      is_staff: true,
      is_matcher: true,
      is_moderator: true,
      first_name: "",
      last_name: "",
      matching_entry: null,
      token: "tokenabcdefg",
    });
  });
  test("should handle a logout action correctly", () => {
    expect(
      userReducer(
        {
          id: 13,
          username: "maxymoo",
          email: "someemail@gmail.com",
          is_staff: false,
          is_matcher: false,
          is_moderator: false,
          first_name: "",
          last_name: "",
          matching_entry: null,
          token: "tokenabcdefg",
        },
        logout()
      )
    ).toEqual(null);
  });
});
