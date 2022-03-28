export default function useLocal() {

    const user = "ast12_user_status";
    const user_role = "ast12_user_role";

    function isAdmin() {
        if (localStorage.getItem(user_role) === "admin") {
            return true;
        }
        return false;
    }

    function isUser() {
        if (localStorage.getItem(user_role) === "user") {
            return true;
        }
        return false;
    }

    function setRole(role) {
        localStorage.setItem(user_role, role);
    }

    function getRole() {
        return localStorage.getItem(user_role);
    }


    function setLoggedIn() {
        localStorage.setItem(user, "logged_in");
    }

    function setLoggedOut() {
        localStorage.setItem(user, "logged_out");
    }

    function isLoggedIn() {
        if (localStorage.getItem(user) === "logged_in") {
            return true;
        }
        return false;
    }


    return {
        isLoggedIn,
        setLoggedIn,
        setLoggedOut,
        isAdmin,
        isUser,
        setRole,
        getRole,
    };

}