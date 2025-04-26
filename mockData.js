export const mockFeed = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/seed/${i + 1}/600/400`,
    annotations: [
      {
        id: `a-${i + 1}-1`,
        x: Math.random() * 80 + 10, 
        y: Math.random() * 80 + 10,
        text: `Annotation ${i + 1} - 1`
      },
      {
        id: `a-${i + 1}-2`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        text: `Annotation ${i + 1} - 2`
      }
    ]
  }));
  