export const validateSearchQuery = (query: string): { ok: boolean; message: string | null } => {

    // Trim whitespace from the query
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
        return { ok: true, message: null }; // Allow empty query to show all products
    }

    // Check if the query is at least 2 characters long
    if (trimmedQuery.length < 2) {
        return {ok:false, message: "Search query must be at least 2 characters long."}
    }

    // Check if the query starts with a space
    if (query.startsWith(" ")) {
        return {ok:false, message: "Search query cannot start with a space."}
    }

    // Check if the query is a valid string
    if (!/^[a-zA-Z0-9\s]+$/.test(trimmedQuery)) {
        return {ok:false, message: "Search query must contain only valid characters."}
    }

    // Clear any previous error messages
    return {ok:true, message: null};
};