import React, { useState } from 'react';
import './Blog.css';

const BlogSubmission = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        category: 'Web Dev',
        content: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setSubmitting(true);
        // Optimistic UI update to handle FormSubmit reliability
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="blog-section">
                <div className="blog-container submission-success">
                    <div className="success-icon">🎉</div>
                    <h2>Article Submitted!</h2>
                    <p>Thanks, <strong>{formData.name}</strong>. Your article "{formData.title}" has been sent for review.</p>
                    <button className="back-btn" onClick={onBack}>Back to Blog</button>
                    <button className="reset-btn" onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', title: '', category: 'Web Dev', content: '' });
                    }}>Submit Another</button>
                </div>
            </div>
        );
    }

    return (
        <section className="blog-section">
            <div className="blog-container">
                <button className="back-link" onClick={onBack}>← Back to Articles</button>

                <div className="submission-form-wrapper" data-aos="fade-up">
                    <h2 className="submission-title">Share Your Knowledge</h2>
                    <p className="submission-subtitle">Have something interesting to share? Write an article for the GDG community.</p>

                    {/* Hidden iframe for seamless submission */}
                    <iframe
                        name="hidden_blog_iframe"
                        id="hidden_blog_iframe"
                        style={{ display: 'none' }}
                    ></iframe>

                    <form
                        className="blog-form"
                        action="https://formsubmit.co/gdgsjcem@gmail.com"
                        method="POST"
                        target="hidden_blog_iframe"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="_subject" value={`New Blog Submission: ${formData.title}`} />
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="form-row">
                            <div className="form-group">
                                <label>Author Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Article Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter a catchy title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Web Dev">Web Development</option>
                                <option value="AI/ML">AI / Machine Learning</option>
                                <option value="Cloud">Cloud Computing</option>
                                <option value="Mobile">Mobile Dev</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Content (Markdown supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                placeholder="Write your article content here..."
                                rows="10"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-blog-btn" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Article'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BlogSubmission;
