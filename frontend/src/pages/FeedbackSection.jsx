import React, { useState } from 'react';
import SourceTag from '../components/Layout/SourceTag';
import { MessageSquare, Star, Send, CheckCircle2, ThumbsUp, PieChart as PieIcon, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { t } from '../utils/translations';

export default function FeedbackSection({ lang = 'en' }) {
  const text = t[lang] || t.en;
  
  // Form State
  const [city, setCity] = useState('Delhi NCR');
  const [category, setCategory] = useState('Air Pollution');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Existing Feedbacks Feed
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, city: 'Delhi NCR', category: 'Air Pollution', rating: 4, comment: 'Sprinkler trucks deployed on Ring Road improved localized PM10 dust levels.', date: 'Today 05:20 PM', status: 'VERIFIED ✓' },
    { id: 2, city: 'Bengaluru', category: 'Public Bus Access', rating: 5, comment: 'Electric bus frequency on Outer Ring Road has reduced waiting times significantly.', date: 'Today 03:15 PM', status: 'VERIFIED ✓' },
    { id: 3, city: 'Lucknow', category: 'Garbage Pickup', rating: 3, comment: 'Collection truck delayed by 2 hours in Ward 14. Action requested.', date: 'Today 01:40 PM', status: 'IN REVIEW' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback = {
      id: Date.now(),
      city,
      category,
      rating,
      comment,
      date: 'Just Now',
      status: 'SUBMITTED ✓'
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setSubmitted(true);
    setComment('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const ratingPieData = [
    { name: '5 Stars (Excellent)', value: 14, color: '#10B981' },
    { name: '4 Stars (Good)', value: 8, color: '#00F0FF' },
    { name: '3 Stars (Average)', value: 4, color: '#F59E0B' },
    { name: '1-2 Stars (Poor)', value: 2, color: '#EF4444' }
  ];

  const categoryBarData = [
    { category: 'Air Quality', count: 12 },
    { category: 'Bus Service', count: 9 },
    { category: 'Garbage', count: 5 },
    { category: 'Water Pipe', count: 2 }
  ];

  return (
    <div className="page-container">
      <div className="page-title-group">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="page-title">
              <MessageSquare style={{ color: 'var(--neon-saffron)' }} />
              <span className="gradient-text-saffron">
                {lang === 'hi' ? '07 — नागरिक प्रतिक्रिया और रेटिंग' : '07 — CITIZEN FEEDBACK & RATINGS'}
              </span>
            </h1>
            <p className="page-subtitle">
              {lang === 'hi' ? 'शहर की सेवाओं पर अपनी प्रतिक्रिया दें और रेटिंग देखें' : 'Rate municipal services and submit civic feedback directly to city managers'}
            </p>
          </div>
          <SourceTag type="REAL" text="CITIZEN FEEDBACK PORTAL" />
        </div>
      </div>

      {/* TOP CHARTS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={16} style={{ color: 'var(--neon-emerald)' }} /> Citizen Rating Distribution (Pie Chart)
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ratingPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                  {ratingPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={16} style={{ color: 'var(--neon-cyan)' }} /> Feedback Volume by Service Category
          </h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBarData}>
                <XAxis dataKey="category" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip contentStyle={{ background: '#0E1626', borderColor: '#00F0FF', borderRadius: '8px', color: '#FFF' }} />
                <Bar dataKey="count" fill="#FF7722" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* MAIN GRID: Submission Form + Live Feedback Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
        
        {/* SUBMISSION FORM */}
        <div className="glass-panel glass-panel-saffron" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#FFF', marginBottom: '20px' }}>
            {lang === 'hi' ? 'अपनी प्रतिक्रिया दर्ज करें' : 'Submit Your Feedback'}
          </h3>

          {submitted && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> {lang === 'hi' ? 'धन्यवाद! आपकी प्रतिक्रिया दर्ज कर ली गई है।' : 'Thank you! Your feedback has been recorded successfully.'}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'शहर चुनें' : 'SELECT CITY'}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: '100%', background: 'var(--secondary-navy)', color: '#FFF', border: '1px solid var(--border-cyan)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'सेवा श्रेणी' : 'SERVICE CATEGORY'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', background: 'var(--secondary-navy)', color: '#FFF', border: '1px solid var(--border-cyan)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="Air Pollution">Air Pollution & Clean Air</option>
                <option value="Garbage Pickup">Garbage Collection</option>
                <option value="Public Bus Access">Public Bus & Metro Access</option>
                <option value="Water Supply">Water Supply & Leakage</option>
                <option value="Road Maintenance">Roads & Infrastructure</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'रेटिंग (1-5 स्टार)' : 'RATING (1 TO 5 STARS)'}
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      background: rating >= star ? 'rgba(255, 119, 34, 0.2)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${rating >= star ? 'var(--neon-saffron)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      color: rating >= star ? 'var(--neon-saffron)' : 'var(--text-muted)'
                    }}
                  >
                    <Star size={18} fill={rating >= star ? '#FF7722' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                {lang === 'hi' ? 'आपकी टिप्पणी' : 'YOUR FEEDBACK COMMENT'}
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={lang === 'hi' ? 'अपनी प्रतिक्रिया या अनुभव यहां लिखें...' : 'Describe your experience with this city service...'}
                style={{ width: '100%', background: 'var(--secondary-navy)', color: '#FFF', border: '1px solid var(--border-cyan)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              <Send size={16} /> {lang === 'hi' ? 'प्रतिक्रिया भेजें' : 'Submit Citizen Feedback'}
            </button>

          </form>
        </div>

        {/* LIVE FEEDBACK CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#FFF' }}>
            {lang === 'hi' ? 'हाल की नागरिक प्रतिक्रियाएं' : 'Recent Citizen Submissions'}
          </h3>

          {feedbacks.map((fb) => (
            <div key={fb.id} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '900', color: 'var(--neon-cyan)' }}>{fb.city}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '8px' }}>• {fb.category}</span>
                </div>

                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: '8px 0' }}>"{fb.comment}"</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span>{fb.date}</span>
                <span style={{ color: 'var(--neon-emerald)', fontWeight: '800' }}>{fb.status}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
