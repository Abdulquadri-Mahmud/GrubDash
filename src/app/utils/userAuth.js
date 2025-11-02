export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("userToken");
    return !!token; // returns true if token exists
}

