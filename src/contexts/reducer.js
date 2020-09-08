export const initialState = {
  user: null,
  rooms: [],
  detailRoom: null,
  messages: [],
  allUsers: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ROOMS: "SET_ROOMS",
  SET_ROOMS_PUSHER: "SET_ROOMS_PUSHER",
  SET_DETAIL_ROOM: "SET_DETAIL_ROOM",
  SET_ROOM_MESSAGES: "SET_ROOM_MESSAGES",
  SET_MESSAGES_PUSHER: "SET_MESSAGES_PUSHER",
  SET_ALL_USERS: "SET_ALL_USERS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      };

    case actionTypes.SET_ROOMS_PUSHER:
      return {
        ...state,
        rooms: [...state.rooms, action.room],
      };

    case actionTypes.SET_DETAIL_ROOM:
      return {
        ...state,
        detailRoom: action.room,
      };

    case actionTypes.SET_ROOM_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };

    case actionTypes.SET_MESSAGES_PUSHER:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    case actionTypes.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users,
      };

    default:
      return state;
  }
};

export default reducer;
