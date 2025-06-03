import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Download } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  details: string;
}

// Mock data
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Architecture',
    description: 'Exploring contemporary architectural marvels',
    imageUrl: 'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Architecture',
    date: 'June 15, 2024',
    details: 'This stunning architectural masterpiece showcases the perfect balance between form and function. The design emphasizes clean lines, open spaces, and natural light, creating a harmonious environment that blends seamlessly with its surroundings. The use of sustainable materials and energy-efficient systems demonstrates a commitment to environmental responsibility without compromising on aesthetic appeal.'
  },
  {
    id: '2',
    title: 'Nature Inspired',
    description: 'Designs that harmonize with natural elements',
    imageUrl: 'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Nature',
    date: 'May 22, 2024',
    details: 'Drawing inspiration from the organic shapes and patterns found in nature, this design creates a sense of tranquility and connection to the natural world. The careful integration of living elements with modern materials produces a unique aesthetic that soothes the soul while stimulating the senses. This approach to design not only enhances the visual appeal but also promotes well-being and environmental consciousness.'
  },
  {
    id: '3',
    title: 'Urban Perspectives',
    description: 'The beauty of city landscapes and urban design',
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Urban',
    date: 'April 8, 2024',
    details: 'This captivating urban landscape captures the dynamic energy and complexity of modern city life. The interplay of light, shadow, and reflection creates a visual symphony that celebrates the man-made environment. The design thoughtfully addresses the challenges of urban density while creating spaces that foster community interaction and cultural expression.'
  },
  {
    id: '4',
    title: 'Minimalist Approach',
    description: 'Simplicity and elegance in design philosophy',
    imageUrl: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Minimalist',
    date: 'March 17, 2024',
    details: 'Embracing the principle that less is more, this minimalist design achieves maximum impact through simplicity and restraint. Every element serves a purpose, with nothing superfluous or distracting. The clean lines, monochromatic palette, and thoughtful negative space create a sense of calm and clarity, allowing the essential beauty of the design to shine through without unnecessary embellishment.'
  },
  {
    id: '5',
    title: 'Vibrant Creations',
    description: 'Bold colors and innovative expressions',
    imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Creative',
    date: 'February 29, 2024',
    details: 'This vibrant creation bursts with energy through its bold use of color and innovative forms. The design challenges conventional aesthetics, inviting viewers to experience spaces in new and exciting ways. The playful combination of hues and unexpected juxtapositions creates visual interest and emotional resonance, demonstrating how color can transform perception and mood.'
  },
  {
    id: '6',
    title: 'Artistic Vision',
    description: 'Where art meets functional design',
    imageUrl: 'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'Artistic',
    date: 'January 12, 2024',
    details: 'This extraordinary fusion of art and functionality demonstrates how practical spaces can be elevated to works of art. The design blurs the boundaries between different creative disciplines, incorporating sculptural elements, artistic textures, and expressive forms while maintaining usability and purpose. This approach challenges the notion that practical design must be utilitarian, proving that everyday spaces can inspire and delight.'
  }
];

const GalleryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setIsLoading(true);
    setTimeout(() => {
      const foundItem = galleryData.find(item => item.id === id) || null;
      setItem(foundItem);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h2>
        <Link to="/gallery" className="text-indigo-600 hover:text-indigo-800 transition-colors">
          Return to gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back button */}
        <Link 
          to="/gallery" 
          className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Gallery
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image section */}
          <div className="relative h-[60vh] overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* Floating action buttons */}
            <div className="absolute bottom-6 right-6 flex space-x-3">
              <button 
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full ${
                  liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                } transition-colors shadow-lg`}
              >
                <Heart size={20} className={liked ? 'fill-current' : ''} />
              </button>
              <button className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors shadow-lg">
                <Share2 size={20} />
              </button>
              <button className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors shadow-lg">
                <Download size={20} />
              </button>
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {item.category}
              </span>
              <span className="text-gray-500 text-sm">
                {item.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {item.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {item.description}
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-gray-700">
                {item.details}
              </p>
            </div>
          </div>
        </div>
        
        {/* Related items section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryData
              .filter(relatedItem => relatedItem.id !== item.id)
              .slice(0, 3)
              .map(relatedItem => (
                <Link 
                  key={relatedItem.id}
                  to={`/gallery/${relatedItem.id}`}
                  className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedItem.imageUrl}
                      alt={relatedItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {relatedItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{relatedItem.category}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;