export const getBooks =   async ()  => {
    const url = "/api/v1/books/list";
    try {
    const response = await fetch(url)
        if(response.ok)
        return response.json();
        throw new Error(response.error);
    } catch (error) {
        throw error;
    }
        
}
