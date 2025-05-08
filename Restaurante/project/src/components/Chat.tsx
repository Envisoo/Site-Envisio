import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { MessageSquare, Send, Image, UserCheck, Heart, Video, Edit, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}

interface Media {
  type: 'image' | 'video';
  url: string;
}

interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  media?: Media;
  timestamp: number;
  likes: string[];
  comments: Comment[];
  isEditing?: boolean;
}

interface ActiveUser {
  id: string;
  name: string;
  status: 'online' | 'away';
  avatar: string;
}

export const Chat: React.FC = () => {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState<Record<string, string>>({});
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>(() => {
    const loggedUsers = JSON.parse(localStorage.getItem('loggedUsers') || '[]');
    return loggedUsers.map((user: any) => ({
      id: user.id,
      name: user.name,
      status: 'online',
      avatar: `https://i.pravatar.cc/150?u=${user.id}`
    }));
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : {};
  });

  const [newPost, setNewPost] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<{ file: File; type: 'image' | 'video' } | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<Record<string, string>>({});
  const [showChat, setShowChat] = useState<Record<string, boolean>>({});

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setSelectedMedia({ file, type });
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!newPost.trim() && !selectedMedia)) return;

    if (editingPost) {
      handleUpdatePost(editingPost);
      return;
    }

    const newPostObj: Post = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newPost,
      timestamp: Date.now(),
      likes: [],
      comments: [],
      media: selectedMedia ? {
        type: selectedMedia.type,
        url: URL.createObjectURL(selectedMedia.file)
      } : undefined
    };

    setPosts(prev => [newPostObj, ...prev]);
    setNewPost('');
    setSelectedMedia(null);
  };

  const handleEditPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(postId);
      setNewPost(post.content);
    }
  };

  const handleUpdatePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, content: newPost };
      }
      return post;
    }));
    setEditingPost(null);
    setNewPost('');
  };

  const handleLike = (postId: string) => {
    if (!user) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const likes = post.likes.includes(user.id)
          ? post.likes.filter(id => id !== user.id)

          : [...post.likes, user.id.toString()];
        return { ...post, likes };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    if (!user || !commentContent[postId]?.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          userId: user.id,
          userName: user.name,
          content: commentContent[postId],
          timestamp: Date.now()
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    setCommentContent(prev => ({ ...prev, [postId]: '' }));
  };

  const handleSendMessage = (receiverId: string) => {
    if (!newMessage[receiverId]?.trim() || !user) return;

    const chatKey = [user.id, receiverId].sort().join('-');
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      content: newMessage[receiverId],
      timestamp: Date.now()
    };

    setChatMessages(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMsg]
    }));

    setNewMessage(prev => ({ ...prev, [receiverId]: '' }));
  };

  const getChatMessages = (userId: string) => {
    if (!user) return [];
    const chatKey = [user.id, userId].sort().join('-');
    return chatMessages[chatKey] || [];
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Lista de Usuários Ativos */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4 text-amber-800">Usuários Online</h2>
            <div className="space-y-4">
              {activeUsers.filter(activeUser => activeUser.id !== user?.id).map(activeUser => (
                <div
                  key={activeUser.id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-amber-50 p-2 rounded-lg transition-colors"
                  onClick={() => setShowChat(prev => ({ ...prev, [activeUser.id]: true }))}
                >
                  <div className="relative">
                    <img
                      src={activeUser.avatar}
                      alt={activeUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      activeUser.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{activeUser.name}</p>
                    <p className="text-sm text-gray-500">
                      {activeUser.status === 'online' ? 'Online' : 'Ausente'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feed Principal */}
        <div className="md:col-span-3 space-y-6">
          {/* Formulário de Nova Publicação */}
          <form onSubmit={handlePostSubmit} className="bg-white rounded-lg shadow p-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="O que você está pensando?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={3}
            />
            {selectedMedia && (
              <div className="mt-2 relative inline-block">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={URL.createObjectURL(selectedMedia.file)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(selectedMedia.file)}
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-3">
                <label className="cursor-pointer hover:text-amber-700 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMediaSelect}
                  />
                  <Image size={24} />
                </label>
                <label className="cursor-pointer hover:text-amber-700 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleMediaSelect}
                  />
                  <Video size={24} />
                </label>
              </div>
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors flex items-center gap-2"
              >
                {editingPost ? 'Atualizar' : 'Publicar'}
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Lista de Publicações */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?u=${post.userId}`}
                    alt={post.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{post.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
                {post.userId === user?.id && !editingPost && (
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                )}
              </div>

              {editingPost === post.id ? (
                <div className="mb-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(null);
                        setNewPost('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleUpdatePost(post.id)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mb-4">{post.content}</p>
              )}

              {post.media && (
                <div className="mb-4">
                  {post.media.type === 'image' ? (
                    <img
                      src={post.media.url}
                      alt="Post"
                      className="rounded-lg max-h-96 w-full object-cover"
                    />
                  ) : (
                    <video
                      src={post.media.url}
                      controls
                      className="rounded-lg max-h-96 w-full"
                    />
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 text-gray-600">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    post.likes.includes(user?.id || '') ? 'text-red-500' : 'hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={post.likes.includes(user?.id || '') ? 'currentColor' : 'none'} />
                  <span>{post.likes.length}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-amber-600 transition-colors">
                  <MessageSquare size={20} />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {/* Seção de Comentários */}
              <div className="mt-4 border-t pt-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="mb-3 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={`https://i.pravatar.cc/150?u=${comment.userId}`}
                        alt={comment.userName}
                        className="w-6 h-6 rounded-full"
                      />
                      <p className="font-medium text-sm">{comment.userName}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm ml-8">{comment.content}</p>
                  </div>
                ))}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={commentContent[post.id] || ''}
                    onChange={(e) => setCommentContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Escreva um comentário..."
                    className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="bg-amber-600 text-white px-4 rounded-full hover:bg-amber-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Popups */}
      {Object.entries(showChat).map(([userId, isVisible]) => {
        if (!isVisible) return null;
        const chatUser = activeUsers.find(u => u.id === userId);
        if (!chatUser) return null;

        return (
          <div
            key={userId}
            className="fixed bottom-0 right-4 w-80 bg-white rounded-t-lg shadow-lg"
          >
            <div className="p-3 bg-amber-600 text-white rounded-t-lg flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  src={chatUser.avatar}
                  alt={chatUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{chatUser.name}</span>
              </div>
              <button
                onClick={() => setShowChat(prev => ({ ...prev, [userId]: false }))}
                className="hover:bg-amber-700 rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
            <div className="h-80 flex flex-col">
              <div className="flex-1 p-3 overflow-y-auto">
                {getChatMessages(userId).map(message => (
                  <div
                    key={message.id}
                    className={`mb-2 max-w-[80%] ${
                      message.senderId === user?.id ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      message.senderId === user?.id 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'bg-gray-100'
                    }`}>
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage[userId] || ''}
                    onChange={(e) => setNewMessage(prev => ({ ...prev, [userId]: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(userId);
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handleSendMessage(userId)}
                    className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;