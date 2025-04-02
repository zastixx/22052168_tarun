interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
}

class ApiService {
  private BASE_URL = 'http://20.244.56.144/evaluation-service';

  async getPosts(userId?: string): Promise<Post[]> {
    const endpoint = userId 
      ? `${this.BASE_URL}/users/${userId}/posts`
      : `${this.BASE_URL}/users`;
    const response = await fetch(endpoint);
    return response.json();
  }

  async getComments(postId: string): Promise<Comment[]> {
    const response = await fetch(`${this.BASE_URL}/posts/${postId}/comments`);
    return response.json();
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.BASE_URL}/users`);
    return response.json();
  }
}

export const api = new ApiService();
