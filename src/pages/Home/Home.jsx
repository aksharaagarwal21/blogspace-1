import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all', 'Technology', 'Lifestyle', 'Travel', 'Food', 
    'Business', 'Health', 'Education', 'Entertainment', 'Other'
  ];

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // For now, just set empty array to prevent errors
      // Once backend is connected, this will fetch real data
      setBlogs([]);
    } catch (error) {
      console.error('Fetch blogs error:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'all': '🌟',
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

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, var(--primary-50), var(--secondary-50))',
          borderRadius: 'var(--radius-2xl)',
          marginBottom: '3rem',
          border: '1px solid var(--primary-100)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--primary-600), var(--secondary-600))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Welcome to BlogSpace! 🚀
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            lineHeight: '1.7'
          }}>
            Discover amazing stories, share your thoughts, and connect with passionate writers from around the world.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>🚀</span>
              <span>Start Writing</span>
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              <span>🔑</span>
              <span>Sign In</span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍 What You Can Do</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              Everything you need to create, share, and grow your blog
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Feature Cards */}
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-light)',
              textAlign: 'center',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Write Stories</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Create beautiful blog posts with our intuitive editor and share your experiences
              </p>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-light)',
              textAlign: 'center',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Connect</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Build a community around your content and engage with like-minded writers
              </p>
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-light)',
              textAlign: 'center',
              transition: 'transform 0.2s ease'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Analytics</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Track your blog's performance with detailed insights and grow your audience
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏷️ Explore Categories</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Find stories that match your interests</p>
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {categories.slice(1).map(category => (
              <div
                key={category}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--primary-50)';
                  e.target.style.borderColor = 'var(--primary-300)';
                  e.target.style.color = 'var(--primary-600)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--bg-secondary)';
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.color = 'var(--text-secondary)';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{getCategoryEmoji(category)}</span>
                <span>{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--purple-500), var(--primary-500))',
          padding: '4rem 2rem',
          borderRadius: 'var(--radius-2xl)',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: '0.9',
            color: 'white'
          }}>
            Join thousands of writers sharing their passion on BlogSpace
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/register" 
              style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>✨</span>
              <span>Get Started Free</span>
            </Link>
            <Link 
              to="/about" 
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span>💫</span>
              <span>Learn More</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
