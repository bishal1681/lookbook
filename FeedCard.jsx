import { useRef, useState } from 'react';

export default function FeedCard({ post }) {
  const annotationRefs = useRef({});
  const [activeAnnotationId, setActiveAnnotationId] = useState(null);

  const scrollToAnnotation = (id) => {
    setActiveAnnotationId(id);
    const element = annotationRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md mb-8 p-4 relative">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-full object-cover"
        />
        {post.annotations.map((anno) => (
          <button
            key={anno.id}
            onClick={() => scrollToAnnotation(anno.id)}
            className="absolute w-4 h-4 bg-blue-500 rounded-full"
            style={{
              left: `${anno.x}%`,
              top: `${anno.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            title={anno.text}
          />
        ))}
      </div>

      {/* Show only one annotation card at a time */}
      <div className="mt-4 relative h-20">
        {post.annotations.map((anno) => (
          <div
            key={anno.id}
            ref={(el) => (annotationRefs.current[anno.id] = el)}
            className={`absolute left-0 right-0 transition-opacity duration-300 ${
              activeAnnotationId === anno.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            } p-3 bg-gray-100 rounded-lg shadow-lg`}
          >
            {anno.text}
          </div>
        ))}
      </div>
    </div>
  );
}
