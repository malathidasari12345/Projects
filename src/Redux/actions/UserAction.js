export const SET_USER = (user) => {
    return {
        type: "SET_USER",
        payload: {
            user,
            email: user.email 
        },
    };
};

export const SET_USER_NULL = () => {
    return {
        type: 'SET_USER_NULL',
    };
};
