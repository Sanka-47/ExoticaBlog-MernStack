import { getPosts } from "../src/api";
import { useState, useEffect } from "react";
import { BlogCard } from "../src/components/BlogCard";
import { Link } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      data.sort(
        (d1, d2) =>
          new Date(d2.dateCreated).getTime() -
          new Date(d1.dateCreated).getTime()
      );
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil((posts.length - 2) / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(2).slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-[#0e1522] pt-3 mt-17 mb-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-[#f4ddcd] text-3xl font-semibold mb-6 text-center prompt-regular">
            Today's Featured Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={post._id}
                to={`/readblog/${post._id}`}
                className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={post.imgUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentPosts.map((post) => (
           <div className="h-[400px]"> {/* Fixed height container */}
           <BlogCard key={post._id} post={post} />
         </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" className="my-8">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#1c2938',
                },
                '& .Mui-selected': {
                  backgroundColor: '#1c2938 !important',
                  color: '#ffffff',
                },
              }}
            />
          </Stack>
        )}
      </div>
    </>
  );
}