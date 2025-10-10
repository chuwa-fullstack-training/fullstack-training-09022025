// In-memory data store (replace with database in production)

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  role: 'USER' | 'ADMIN';
  bio?: string;
  avatar?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: string;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
export const users: User[] = [
  {
    id: '1',
    username: 'alice',
    email: 'alice@example.com',
    password: '$2a$10$xHqQJZ9KzQqWx8oBqPqNPeLH.vKjHQsNPqY3mVEQJJWKr0qvYqJ3W', // password: "password123"
    role: 'ADMIN',
    bio: 'Full-stack developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    username: 'bob',
    email: 'bob@example.com',
    password: '$2a$10$xHqQJZ9KzQqWx8oBqPqNPeLH.vKjHQsNPqY3mVEQJJWKr0qvYqJ3W',
    role: 'USER',
    bio: 'Frontend enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    username: 'charlie',
    email: 'charlie@example.com',
    password: '$2a$10$xHqQJZ9KzQqWx8oBqPqNPeLH.vKjHQsNPqY3mVEQJJWKr0qvYqJ3W',
    role: 'USER',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'Introduction to GraphQL',
    content: 'GraphQL is a query language for APIs...',
    status: 'PUBLISHED',
    authorId: '1',
    tags: ['graphql', 'api', 'tutorial'],
    viewCount: 150,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    title: 'Building REST APIs with Express',
    content: 'Express is a minimal web framework...',
    status: 'PUBLISHED',
    authorId: '1',
    tags: ['express', 'nodejs', 'rest'],
    viewCount: 200,
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    id: '3',
    title: 'React Hooks Deep Dive',
    content: 'Hooks let you use state and other React features...',
    status: 'DRAFT',
    authorId: '2',
    tags: ['react', 'hooks', 'javascript'],
    viewCount: 0,
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
  },
  {
    id: '4',
    title: 'TypeScript Best Practices',
    content: 'TypeScript adds static typing to JavaScript...',
    status: 'PUBLISHED',
    authorId: '2',
    tags: ['typescript', 'javascript'],
    viewCount: 300,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '5',
    title: 'Node.js Performance Tips',
    content: 'Optimizing Node.js applications...',
    status: 'PUBLISHED',
    authorId: '3',
    tags: ['nodejs', 'performance'],
    viewCount: 100,
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09'),
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    text: 'Great article!',
    authorId: '2',
    postId: '1',
    createdAt: new Date('2024-01-05T10:00:00'),
    updatedAt: new Date('2024-01-05T10:00:00'),
  },
  {
    id: '2',
    text: 'Very informative, thanks for sharing!',
    authorId: '3',
    postId: '1',
    createdAt: new Date('2024-01-05T11:00:00'),
    updatedAt: new Date('2024-01-05T11:00:00'),
  },
  {
    id: '3',
    text: 'Can you elaborate on resolvers?',
    authorId: '3',
    postId: '1',
    createdAt: new Date('2024-01-05T12:00:00'),
    updatedAt: new Date('2024-01-05T12:00:00'),
  },
  {
    id: '4',
    text: 'Express is awesome!',
    authorId: '2',
    postId: '2',
    createdAt: new Date('2024-01-06T10:00:00'),
    updatedAt: new Date('2024-01-06T10:00:00'),
  },
];

// Helper functions
let userIdCounter = users.length + 1;
let postIdCounter = posts.length + 1;
let commentIdCounter = comments.length + 1;

export const generateId = (type: 'user' | 'post' | 'comment'): string => {
  switch (type) {
    case 'user':
      return String(userIdCounter++);
    case 'post':
      return String(postIdCounter++);
    case 'comment':
      return String(commentIdCounter++);
  }
};
