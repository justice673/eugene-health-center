import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

/**
 * Blog Page
 * Health articles, tips, and medical news
 */
export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: '10 Essential Tips for Maintaining Heart Health',
    excerpt: 'Discover the most effective ways to keep your heart healthy and reduce the risk of cardiovascular diseases.',
    author: 'Dr. Sarah Johnson',
    date: 'November 25, 2025',
    readTime: '8 min read',
    category: 'Cardiology',
    image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1200',
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Understanding Mental Health: Breaking the Stigma',
      excerpt: 'Mental health is just as important as physical health. Learn how to recognize signs and seek help.',
      author: 'Dr. David Kim',
      date: 'November 22, 2025',
      readTime: '6 min read',
      category: 'Mental Health',
      image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Nutrition Guide: Eating for Optimal Health',
      excerpt: 'A comprehensive guide to balanced nutrition and how food choices impact your overall well-being.',
      author: 'Dr. Emily Williams',
      date: 'November 20, 2025',
      readTime: '10 min read',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Pediatric Care: Your Child\'s Health Milestones',
      excerpt: 'Important developmental milestones and health checkups every parent should know about.',
      author: 'Dr. Michael Chen',
      date: 'November 18, 2025',
      readTime: '7 min read',
      category: 'Pediatrics',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      title: 'Managing Chronic Pain: Modern Treatment Options',
      excerpt: 'Explore the latest approaches to managing chronic pain and improving quality of life.',
      author: 'Dr. James Anderson',
      date: 'November 15, 2025',
      readTime: '9 min read',
      category: 'Orthopedics',
      image: 'https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Skin Care Essentials: Dermatologist-Approved Tips',
      excerpt: 'Expert advice on maintaining healthy, glowing skin at any age.',
      author: 'Dr. Maria Garcia',
      date: 'November 12, 2025',
      readTime: '5 min read',
      category: 'Dermatology',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      title: 'Telemedicine Revolution: Healthcare at Your Fingertips',
      excerpt: 'How online consultations are transforming healthcare delivery and patient experience.',
      author: 'Dr. Sarah Johnson',
      date: 'November 10, 2025',
      readTime: '6 min read',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/5863391/pexels-photo-5863391.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      title: 'Exercise and Immunity: The Connection',
      excerpt: 'Learn how regular physical activity strengthens your immune system and overall health.',
      author: 'Dr. Emily Williams',
      date: 'November 8, 2025',
      readTime: '7 min read',
      category: 'Wellness',
      image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      title: 'Sleep Disorders: Causes and Solutions',
      excerpt: 'Understanding common sleep problems and evidence-based strategies for better rest.',
      author: 'Dr. David Kim',
      date: 'November 5, 2025',
      readTime: '8 min read',
      category: 'Mental Health',
      image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const categories = [
    'All Posts',
    'Cardiology',
    'Mental Health',
    'Nutrition',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Technology',
    'Wellness',
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Health <span className="text-blue-600">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert medical advice, health tips, and the latest healthcare news from our team of professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-96 md:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    ⭐ Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="text-blue-200 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-200 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{featuredPost.author}</p>
                        <p className="text-blue-200 text-sm">{featuredPost.date}</p>
                      </div>
                    </div>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg flex items-center space-x-2">
                      <span>Read More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-gray-50 sticky top-20 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    idx === 0
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                >
                  {/* Post Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
                      {post.category}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto">
                <span>Load More Articles</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest health tips and medical news delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

