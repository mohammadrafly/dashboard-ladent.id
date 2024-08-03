import React, { useState, useEffect } from "react";
import AppLayouts from "../../../Layouts/AppLayouts";
import { getFilteredPosts, getSortedPosts, paginatePosts, getPageNumbers } from "../../../Utils/PostUtils";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [sortBy, setSortBy] = useState("title");

    useEffect(() => {
        const dummyPosts = [];
        for (let i = 1; i <= 50; i++) {
            dummyPosts.push({
                title: `Post Title ${i}`,
                content: `Content of post ${i}`,
                image: `Image URL ${i}`,
                slug: `post-title-${i}`
            });
        }
        setPosts(dummyPosts);
    }, []);

    const filteredPosts = getFilteredPosts(posts, searchTerm);
    const sortedPosts = getSortedPosts(filteredPosts, sortBy, sortDirection);
    const currentPosts = paginatePosts(sortedPosts, currentPage, postsPerPage);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePostsPerPageChange = (e) => {
        setPostsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortChange = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("asc");
        }
    };

    const pageNumbers = getPageNumbers(filteredPosts.length, postsPerPage, currentPage);

    return (
        <AppLayouts title={`Posts`}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by title, content, image, slug, or id..."
                            className="p-2 border rounded"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className="flex items-center">
                            <label htmlFor="postsPerPage" className="mr-2 dark:text-white">Posts per page:</label>
                            <select
                                id="postsPerPage"
                                value={postsPerPage}
                                onChange={handlePostsPerPageChange}
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
                        Add Post
                    </button>
                </div>
                <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <thead className="text-left">
                        <tr>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSortChange("title")}
                            >
                                Title {sortBy === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSortChange("content")}
                            >
                                Content {sortBy === "content" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSortChange("image")}
                            >
                                Image {sortBy === "image" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 border-b dark:border-gray-600 cursor-pointer"
                                onClick={() => handleSortChange("slug")}
                            >
                                Slug {sortBy === "slug" && (sortDirection === "asc" ? "↑" : "↓")}
                            </th>
                            <th className="py-2 px-4 border-b dark:border-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post) => (
                            <tr key={post.slug}>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{post.title}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{post.content}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{post.image}</td>
                                <td className="py-2 px-4 border-b dark:border-gray-600">{post.slug}</td>
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
                        disabled={currentPage * postsPerPage >= filteredPosts.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayouts>
    );
};

export default Post;
