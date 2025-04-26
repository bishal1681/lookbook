import { useEffect, useState, useRef } from 'react';
import { mockFeed } from '../data/mockData';
import FeedCard from './FeedCard';

export default function Feed() {
  const [feed, setFeed] = useState(mockFeed.slice(0, 10));
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const loadMore = () => {
    setFeed((prev) => [
      ...prev,
      ...mockFeed.slice(page * 10, (page + 1) * 10)
    ]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, { threshold: 1 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {feed.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
      <div ref={loader} className="h-20 flex justify-center items-center text-gray-400">
        Loading more...
      </div>
    </div>
  );
}
