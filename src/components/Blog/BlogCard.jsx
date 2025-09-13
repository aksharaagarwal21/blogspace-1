import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import './BlogCard.css';

const BlogCard = ({ blog, showActions = false, onEdit, onDelete }) => {
  const { user, isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(blog.isLiked || false);
  const [likesCount, setLikesCount] = useState(blog.likesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to like posts! 🔑');
      return;
    }

    if (loading) return;

    setLoading(true);
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

    // Optimistic update
    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      const response = await axios.post(`/api/blogs/${blog._id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        setLikesCount(response.data.data.likesCount);
        setIsLiked(response.data.data.isLiked);
      }
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(!newIsLiked);
      setLikesCount(likesCount);
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Technology': '💻',
      'Lifestyle': '🌟',
      'Travel': '✈️',
      'Food': '🍕',
      'Business': '💼',
      'Health': '🏥',
      'Education': '📚',
      'Entertainment': '🎬',
      'Other': '📝'
    };
    return emojis[category] || '📝';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'var(--secondary-500)',
      'Lifestyle': 'var(--primary-500)',
      'Travel': 'var(--accent-500)',
      'Food': 'var(--peach-500)',
      'Business': 'var(--purple-500)',
      'Health': 'var(--accent-600)',
      'Education': 'var(--secondary-600)',
      'Entertainment': 'var(--primary-600)',
      'Other': 'var(--gray-500)'
    };
    return colors[category] || 'var(--gray-500)';
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = blog.content ? blog.content.split(' ').length : 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <article className="blog-card">
      {/* Featured Image */}
      <div className="blog-image">
        {blog.featuredImage && !imageError ? (
          <img 
            src={blog.featuredImage} 
            alt={blog.title}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span className="placeholder-icon">
              {getCategoryEmoji(blog.category)}
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="category-badge" style={{ backgroundColor: getCategoryColor(blog.category) }}>
          <span className="category-emoji">{getCategoryEmoji(blog.category)}</span>
          <span className="category-name">{blog.category}</span>
        </div>

        {/* Reading Time */}
        <div className="reading-time">
          <span>📖</span>
          <span>{getReadingTime()} min read</span>
        </div>

        {/* Status Badge for owned posts */}
        {showActions && blog.status && (
          <div className={`status-badge ${blog.status}`}>
            {blog.status === 'published' ? '✅' : '📝'}
            <span>{blog.status}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="blog-content">
        {/* Title */}
        <h3 className="blog-title">
          <Link to={`/blog/${blog._id}`}>
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="blog-excerpt">
          {truncateText(blog.excerpt || blog.content)}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="tag-more">+{blog.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Author & Meta */}
        <div className="blog-meta">
          <div className="author-info">
            <div className="author-avatar">
              {blog.author?.avatar ? (
                <img src={blog.author.avatar} alt={blog.author.name} />
              ) : (
                <span className="avatar-placeholder">
                  {blog.author?.name?.charAt(0) || '👤'}
                </span>
              )}
            </div>
            <div className="author-details">
              <span className="author-name">{blog.author?.name || 'Anonymous'}</span>
              <div className="blog-date">
                <span>📅</span>
                <time dateTime={blog.createdAt}>
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </time>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="blog-stats">
            <span className="stat-item">
              <span className="stat-icon">👀</span>
              <span className="stat-count">{blog.views || 0}</span>
            </span>
            <button 
              className={`stat-item like-btn ${isLiked ? 'liked' : ''} ${loading ? 'loading' : ''}`}
              onClick={handleLike}
              disabled={loading}
            >
              <span className="stat-icon">{isLiked ? '❤️' : '🤍'}</span>
              <span className="stat-count">{likesCount}</span>
            </button>
            <Link to={`/blog/${blog._id}#comments`} className="stat-item">
              <span className="stat-icon">💬</span>
              <span className="stat-count">{blog.commentsCount || 0}</span>
            </Link>
          </div>
        </div>

        {/* Action Buttons for owned posts */}
        {showActions && (
          <div className="blog-actions">
            <button 
              onClick={() => onEdit(blog._id)}
              className="btn btn-ghost btn-sm"
            >
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <button 
              onClick={() => onDelete(blog._id)}
              className="btn btn-ghost btn-sm delete-btn"
            >
              <span>🗑️</span>
              <span>Delete</span>
            </button>
            <Link 
              to={`/blog/${blog._id}`}
              className="btn btn-ghost btn-sm"
            >
              <span>👁️</span>
              <span>View</span>
            </Link>
          </div>
        )}
      </div>

      {/* Hover Overlay for public posts */}
      {!showActions && (
        <div className="blog-overlay">
          <Link to={`/blog/${blog._id}`} className="btn btn-primary">
            <span>📖</span>
            <span>Read More</span>
          </Link>
        </div>
      )}
    </article>
  );
};

export default BlogCard;

