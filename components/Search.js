import { useCallback, useRef, useState } from 'react'
import NextLink from "next/link";
import { PostListItem } from "./blog/PostCompact";
import { formatDate } from "../lib/format-date";

export default function Search() {

  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search?q=${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener('click', onClick)
  }, [])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div
      ref={searchRef}
    >
      <input
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Search posts'
        type='text'
        value={query}
      />
      { active && results.length > 0 && results.map((post) => (
          <NextLink href={post.slug} key={post.slug}>
            <a>
              <PostListItem
                title={post.title}
                date={formatDate(post.date)}
                tags={post.tags}
              />
            </a>
          </NextLink>
        ))}
    </div>
  )
}