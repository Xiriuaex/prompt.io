'use client'

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ posts, handleTagClick}) => {
  return(
    <div className="prompt_layout">
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

    //Fectching prompts using the prompt API
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    useEffect(() => {   
      fetchPosts();
    }, [])

    
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      {/* Search bar: */}
      <form className="relative w-[40vw] flex-center">
        <input 
          type="text" 
          placeholder="Search"
          value={searchText}
          required
          onChange={handleSearchChange}
          className="search_input peer "
        />
      </form>
  
      {searchText ? (
        <PromptCardList
          posts={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
      <PromptCardList
        posts={posts}
        handleTagClick={handleTagClick}
      /> 
    )}

    </section>
  )
}

export default Feed
