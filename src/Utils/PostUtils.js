export const getFilteredPosts = (posts, searchTerm) => {
    const searchLower = searchTerm.toLowerCase();
    return posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.image.toLowerCase().includes(searchLower) ||
        post.slug.toLowerCase().includes(searchLower)
    );
};

export const getSortedPosts = (posts, sortBy, sortDirection) => {
    return posts.sort((a, b) => {
        const valueA = a[sortBy].toString().toLowerCase();
        const valueB = b[sortBy].toString().toLowerCase();
        if (sortDirection === "asc") {
            return valueA.localeCompare(valueB);
        } else {
            return valueB.localeCompare(valueA);
        }
    });
};

export const paginatePosts = (posts, currentPage, postsPerPage) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
};

export const getPageNumbers = (totalPosts, postsPerPage, currentPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPageButtons = 5;
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(currentPage + half, pageNumbers.length);

    if (end - start + 1 < maxPageButtons) {
        if (start === 1) {
            end = Math.min(start + maxPageButtons - 1, pageNumbers.length);
        } else {
            start = Math.max(end - maxPageButtons + 1, 1);
        }
    }

    return pageNumbers.slice(start - 1, end);
};