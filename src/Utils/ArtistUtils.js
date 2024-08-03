export const generateDummyArtists = () => {
    const dummyArtists = [];
    for (let i = 1; i <= 50; i++) {
        dummyArtists.push({
            id: i,
            name: `Artist Name ${i}`,
            image: `Image URL ${i}`,
            birthdate: `Birthdate ${i}`,
            bio: `Bio of artist ${i}`
        });
    }
    return dummyArtists;
};

export const filterArtists = (artists, searchTerm) => {
    return artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const sortArtists = (artists, sortColumn, sortDirection) => {
    return artists.sort((a, b) => {
        const aValue = a[sortColumn].toLowerCase();
        const bValue = b[sortColumn].toLowerCase();

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
};

export const paginateArtists = (artists, currentPage, artistsPerPage) => {
    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    return artists.slice(indexOfFirstArtist, indexOfLastArtist);
};

export const getPageNumbers = (totalItems, itemsPerPage, currentPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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