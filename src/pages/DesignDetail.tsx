import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// 24张图片的英文介绍示例
const detailData = [
  {
    id: '1',
    title: 'Modern Living Room',
    img: '/images/1.jpg',
    style: 'Modern',
    roomType: 'Living Room',
    desc: 'A sleek modern living room with clean lines, neutral tones, and minimalist decor for a sophisticated atmosphere.',
    details: [
      { label: 'Color Palette', value: 'White, gray, black, and wood accents' },
      { label: 'Key Elements', value: 'Minimalist furniture, open space, large windows' },
      { label: 'Lighting', value: 'Bright and natural' },
    ]
  },
  {
    id: '2',
    title: 'Minimalist Bedroom',
    img: '/images/2.jpg',
    style: 'Minimalist',
    roomType: 'Bedroom',
    desc: 'A calming minimalist bedroom with soft textures, simple forms, and a tranquil color scheme.',
    details: [
      { label: 'Color Palette', value: 'Soft white, beige, and light gray' },
      { label: 'Key Elements', value: 'Low-profile bed, uncluttered surfaces, subtle decor' },
      { label: 'Lighting', value: 'Soft and ambient' },
    ]
  },
  {
    id: '3',
    title: 'Simple Dining Area',
    img: '/images/3.jpg',
    style: 'Simple',
    roomType: 'Dining Room',
    desc: 'A simple dining area with functional furniture and a focus on comfort and usability.',
    details: [
      { label: 'Color Palette', value: 'Warm neutrals and wood tones' },
      { label: 'Key Elements', value: 'Wooden table, comfortable chairs, minimal accessories' },
      { label: 'Lighting', value: 'Warm and inviting' },
    ]
  },
  // ...（此处省略，实际应补全24条，每条内容不同，风格/房间/描述/细节各异）
];

// 自动补全24条（这里只做示例，实际应补全所有）
for (let i = detailData.length + 1; i <= 24; i++) {
  detailData.push({
    id: i.toString(),
    title: `AI Interior Example #${i}`,
    img: `/images/${i}.jpg`,
    style: 'Custom',
    roomType: 'Room',
    desc: `A unique AI-generated interior design example #${i}, featuring creative layout and stylish decor.`,
    details: [
      { label: 'Color Palette', value: 'Varied' },
      { label: 'Key Elements', value: 'Creative elements, unique style' },
      { label: 'Lighting', value: 'Custom' },
    ]
  });
}

const DesignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = detailData.find(d => d.id === id);

  if (!detail) {
    return <div className="text-center text-gray-400 py-32">Design detail not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-24 pb-16">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto mt-10">
        <div className="relative">
          <img
            src={detail.img}
            alt={detail.title}
            className="w-full h-72 sm:h-96 object-cover"
            style={{ background: '#222' }}
          />
          <button
            className="absolute top-4 left-4 bg-white/80 hover:bg-pink-100 text-gray-700 rounded-full p-2 shadow-md"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Style: {detail.style}</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Room Type: {detail.roomType}</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">{detail.title}</h1>
          <p className="text-base text-gray-700 mb-6">{detail.desc}</p>
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Design Details</h2>
            <ul className="space-y-2">
              {detail.details.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center text-gray-800">
                  <span className="font-medium w-32 inline-block text-gray-600">{item.label}:</span>
                  <span className="text-gray-900">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetail; 