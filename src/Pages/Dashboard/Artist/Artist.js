import React, { useState, useEffect } from "react";
import AppLayouts from "../../../Layouts/AppLayouts";
import { generateDummyArtists, filterArtists, sortArtists, paginateArtists, getPageNumbers } from "../../../Utils/ArtistUtils";

const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [artistsPerPage, setArtistsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        setArtists(generateDummyArtists());
    }, []);

    const filteredArtists = filterArtists(artists, searchTerm);
    const sortedArtists = sortArtists(filteredArtists, sortColumn, sortDirection);
    const currentArtists = paginateArtists(sortedArtists, currentPage, artistsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const handleArtistsPerPageChange = (e) => {
        setArtistsPerPage(parseInt(e.target.value));
        setCurrentPage(1); 
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = getPageNumbers(sortedArtists.length, artistsPerPage, currentPage);

    return (
        <AppLayouts title={`Artists`}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search artists..."
                            className="p-2 border rounded"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className="flex items-center">
                            <label htmlFor="artistsPerPage" className="mr-2 dark:text-white">Artists per page:</label>
                            <select
                                id="artistsPerPage"
                                value={artistsPerPage}
                                onChange={handleArtistsPerPageChange}
                                className="p-2 border rounded"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <button className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Artist
                    </button>
                </div>
                <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <thead className="text-left">
                        <tr>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSort("name")}
                            >
                                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSort("image")}
                            >
                                Image {sortColumn === "image" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSort("birthdate")}
                            >
                                Birthdate {sortColumn === "birthdate" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSort("bio")}
                            >
                                Bio {sortColumn === "bio" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="py-2 px-4 border-b dark:border-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArtists.map((artist) => (
                            <tr key={artist.id}>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{artist.name}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{artist.image}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{artist.birthdate}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{artist.bio}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">
                                    <button className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600">
                                        Update
                                    </button>
                                    <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-l-xl"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={`px-3 ${number === currentPage ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-white"}`}
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="p-2 bg-blue-500 text-white rounded-r-xl"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayouts>
    );
};

export default Artist;
