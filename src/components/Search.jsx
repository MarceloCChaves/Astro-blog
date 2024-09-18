import Fuse from "fuse.js";
import { useState } from "react";

const options = {
  keys: ['data.title', 'data.description'],
  minMatchCharLength: 2,
  includeMatches: true
}

export default function Search({ searchList }) {

  const fuse = new Fuse(searchList, options);
  const [query, setQuery] = useState('');

  const posts = fuse.search(query).map(result => result.item).slice(0, 5)

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(() => value);
  }

  return (
    <>
      <label htmlFor="search" className="sr-only">Search Post</label>
      <input className="block w-full p-4 border text-sm text-gray-900 rounded border-gray-300 mb-4" id="search" type="text" placeholder="Search post" value={query} onChange={handleOnSearch} />

      {query.length > 1 && (
        <p>Found {posts.length} {posts.length === 1 ? 'article' : 'articles'}</p>
      )}

      <ul>
        {posts && posts.map((post) => {
          return (
            <li className="p-4 my-4 border border-gray-500">
              <a className="text-gray-900" href={`/blog/${post.slug}`}>{post.data.title}</a>
              <p className="text-sm text-gray-900">{post.data.description}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}