import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Zap, Eye, Target, Lightbulb, Rocket, Code2, Star, Globe2 } from 'lucide-react';

const timeline = [
  {
    year: '2021',
    title: 'Brand Creation',
    desc: 'AI Interior Design team established, dedicated to using AI to empower interior design.',
    icon: <Rocket size={28} className="text-blue-400" />,
  },
  {
    year: '2022',
    title: 'AI Engine Launch',
    desc: 'First AI interior style generation engine released, supporting multiple mainstream design styles.',
    icon: <Code2 size={28} className="text-purple-400" />,
  },
  {
    year: '2023',
    title: 'Global User Base Exceeds 100,000',
    desc: 'Serving 100,000+ global users, continuously optimizing AI algorithms and user experience.',
    icon: <Globe2 size={28} className="text-green-400" />,
  },
  {
    year: '2024',
    title: 'Multi-Modal AI Upgrade',
    desc: 'Supporting multi-modal input from sketches, text, and photos, making design more intelligent.',
    icon: <Star size={28} className="text-yellow-400" />,
  },
];

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Visionary leader with a passion for AI and design. Alex founded AI Interior Design to make creative technology accessible to all.",
    linkedin: "#"
  },
  {
    name: "Maria Garcia",
    role: "Chief Design Officer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Award-winning designer with 10+ years of experience in interior and digital design. Maria leads our creative direction.",
    linkedin: "#"
  },
  {
    name: "Sam Lee",
    role: "Lead AI Engineer",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Expert in deep learning and generative models. Sam ensures our AI is always at the forefront of innovation.",
    linkedin: "#"
  },
  {
    name: "Yuki Chen",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Yuki bridges the gap between users and technology, ensuring our products are intuitive and delightful.",
    linkedin: "#"
  },
  {
    name: "David Kim",
    role: "Backend Architect",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "David builds robust, scalable systems to support millions of design requests every month.",
    linkedin: "#"
  },
  {
    name: "Sophie Müller",
    role: "UX Researcher",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    bio: "Sophie brings user insights from around the globe, ensuring our platform is intuitive and delightful for everyone.",
    linkedin: "#"
  },
];

const coreValues = [
  {
    icon: <Lightbulb size={36} className="text-yellow-300" />, 
    title: "Creativity First",
    description: "We believe that creativity is the heart of every great design. Our AI is built to inspire and empower your imagination.",
    highlight: "Inspire"
  },
  {
    icon: <Zap size={36} className="text-cyan-400" />, 
    title: "Cutting-Edge Technology",
    description: "We leverage the latest advancements in AI and machine learning to deliver fast, reliable, and stunning results.",
    highlight: "Innovate"
  },
  {
    icon: <Users size={36} className="text-pink-400" />, 
    title: "Global Community",
    description: "We connect designers and dreamers from all over the world, fostering a vibrant and supportive community.",
    highlight: "Connect"
  },
  {
    icon: <Eye size={36} className="text-purple-400" />, 
    title: "Aesthetic Excellence",
    description: "We pursue beauty and functionality in every pixel, ensuring every design is both practical and inspiring.",
    highlight: "Excel"
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent pb-2 drop-shadow-lg">
            About AI Interior Design
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Using AI to empower every space dream. We believe that the combination of technology and aesthetics can make design simpler, more intelligent, and more warm.
          </p>
        </header>

        {/* Time Line */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Brand Growth Timeline</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 opacity-60 -translate-x-1/2" />
            <ul className="space-y-12 relative z-10">
              {timeline.map((item, idx) => (
                <li key={item.year} className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-4 text-right">
                    <div className="inline-block bg-gray-800 rounded-xl px-6 py-4 shadow-lg">
                      <div className="text-xl font-bold mb-1">{item.title}</div>
                      <div className="text-gray-400 mb-1">{item.desc}</div>
                      <div className="text-sm text-blue-200">{item.year}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center mx-4">
                    <div className="bg-black border-4 border-blue-200 rounded-full p-2 shadow-xl mb-2">{item.icon}</div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  </div>
                  <div className="w-1/2 px-4 text-left"></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Core Values - 新样式 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {coreValues.map((value, idx) => (
              <div key={value.title} className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 m-2 flex flex-col items-center border-t-4 border-b-4 border-blue-200 hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-black rounded-full shadow-lg border-2 border-blue-300">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-blue-200 tracking-wide">{value.title}</h3>
                <p className="text-gray-300 text-base mb-3 text-center">{value.description}</p>
                <span className="inline-block mt-auto px-4 py-1 bg-blue-200 text-blue-900 rounded-full font-semibold text-xs tracking-widest shadow">{value.highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Team - 新样式 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 border border-blue-200">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mb-4 border-4 border-blue-300 object-cover shadow-lg" />
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-200 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm text-center mb-3">{member.bio}</p>
                <a href={member.linkedin} className="text-blue-400 hover:text-blue-300 text-sm underline">LinkedIn</a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start AI Design Journey?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-xl mx-auto">
            Join us to experience AI-driven interior design innovation.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition-colors duration-300 transform hover:scale-105 text-lg"
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 