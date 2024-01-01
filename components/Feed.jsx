'use client'

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick}) => {
  return(
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  const [searchText, setSearchText]= useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) => {
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPrompts(searchText));
      }, 500)
    ) 
  }

  //Fectching prompts using the prompt API
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
    }
  
    fetchPosts();
  }, [])


  return (
    <section className="feed">
      {/* Search bar: */}
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
  
      {searchText ? (
        <PromptCardList
          posts={searchedResults}
          handleTagClick={() => {}}
        />
      ) : (
      <PromptCardList
        posts={posts}
        handleTagClick={()=>{}}
      /> 
    )}

    </section>
  )
}

export default Feed
