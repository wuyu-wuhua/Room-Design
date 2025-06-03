import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Palette, Wand2, Zap, CheckCircle, Download, Share2, Settings, HelpCircle, Image as ImageIcon, BedDouble, Lamp, Sofa, Utensils, Bath, Tv, Briefcase, Home as HomeIcon, X, UserCircle, BarChart2, CreditCard, DollarSign, Cpu, LogOut, Menu } from 'lucide-react';
import Navbar from '../components/Navbar';
import { INTERIOR_STYLES } from '../data/styles';

const roomTypes = [
  { name: "Living Room", icon: <Sofa size={20} /> },
  { name: "Bedroom", icon: <BedDouble size={20} /> },
  { name: "Children's Room", icon: <HomeIcon size={20} /> },
  { name: "Study", icon: <Briefcase size={20} /> },
  { name: "Balcony", icon: <Lamp size={20} /> },
  { name: "Walk-in Closet", icon: <Settings size={20} /> },
  { name: "Entertainment Room", icon: <Tv size={20} /> },
  { name: "Gym", icon: <Zap size={20} /> },
  { name: "Dining Room", icon: <Utensils size={20} /> },
  { name: "Bathroom", icon: <Bath size={20} /> },
  { name: "Kitchen", icon: <Utensils size={20} /> },
  { name: "Storage Room", icon: <HelpCircle size={20} /> },
  { name: "Office", icon: <Briefcase size={20} /> },
];

const sidebarNav = [
  { name: 'Home', icon: <HomeIcon size={20} />, path: '/' },
  { name: 'Personal', icon: <UserCircle size={20} />, path: '/user-profile' },
  { name: 'Design Room', icon: <ImageIcon size={20} />, path: '/design-room' },
  { name: 'TextRoom', icon: <ImageIcon size={20} />, path: '/text-room' },
  { name: 'Statistics', icon: <BarChart2 size={20} />, path: '/statistics' },
  { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
  { name: 'Pricing', icon: <DollarSign size={20} />, path: '/pricing' },
];

const DesignRoomPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedDesigns([]); // Reset generated designs on new upload
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
  });

  const handleGenerateDesigns = () => {
    if (!uploadedImage && !selectedStyle) {
      alert("Please upload an image or select a style to start.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Replace with actual AI-generated image URLs
      setGeneratedDesigns([
        `https://picsum.photos/seed/gen1-${Date.now()}/800/600`,
        `https://picsum.photos/seed/gen2-${Date.now()}/800/600`,
        `https://picsum.photos/seed/gen3-${Date.now()}/800/600`,
        `https://picsum.photos/seed/gen4-${Date.now()}/800/600`,
        `https://picsum.photos/seed/gen5-${Date.now()}/800/600`,
        `https://picsum.photos/seed/gen6-${Date.now()}/800/600`,
      ]);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col pt-20 md:pt-24">
      {/* 移动端汉堡按钮 */}
      <button className="fixed top-4 left-4 z-50 md:hidden bg-[#232b3a] p-2 rounded-lg shadow-lg" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
        <Menu size={28} />
      </button>
      <div className="flex w-full min-h-screen">
        {/* 侧边栏 */}
        {/* 移动端抽屉式侧边栏 */}
        <div className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`} onClick={() => setSidebarOpen(false)} />
        <aside className={`fixed top-0 left-0 z-50 bg-[#181c23] w-64 h-full py-8 space-y-5 shadow-2xl flex flex-col items-center transform transition-transform duration-300 md:static md:w-20 md:flex md:flex-col md:items-center ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <button className="absolute top-4 right-4 md:hidden text-white text-2xl" onClick={() => setSidebarOpen(false)}>&times;</button>
          {sidebarNav.map(item => (
            <a
              key={item.name}
              href={item.path}
              className="flex flex-col items-center justify-center text-white hover:text-blue-400 transition-colors duration-200 group my-2"
            >
              {item.icon}
              <span className="text-[11px] mt-0.5 group-hover:font-bold whitespace-nowrap leading-tight">{item.name}</span>
            </a>
          ))}
          <button className="flex flex-col items-center justify-center text-white hover:text-pink-400 transition-colors duration-200 mt-8" onClick={() => {/* TODO: logout */}}>
            <LogOut size={20} />
            <span className="text-[11px] mt-0.5 leading-tight">Logout</span>
          </button>
        </aside>
        {/* 主内容区 */}
        <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {/* Left Panel: Upload & Style Selection */}
          <aside className="lg:col-span-3 bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl flex flex-col space-y-6 h-fit lg:sticky lg:top-36">
          <div>
              <h2 className="text-lg font-semibold mb-3 text-purple-400 flex items-center">
                <UploadCloud size={22} className="mr-2" /> Upload Your Space
              </h2>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 sm:p-10 text-center cursor-pointer transition-colors hover:border-pink-500 hover:bg-gray-700/50 ${isDragActive ? 'border-pink-600 bg-pink-900/30' : 'border-gray-600'}`}
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded space" className="max-h-40 mx-auto rounded-md mb-3 shadow-md" />
                ) : (
                  <UploadCloud size={40} className="mx-auto mb-3 text-gray-400" />
                )}
                <p className="text-sm text-gray-400">
                  {isDragActive ? "Drop the image here..." : "Drag 'n' drop an image, or click to select"}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </div>

            {/* Select room type 下拉列表 */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-purple-400 flex items-center">
                <HomeIcon size={22} className="mr-2" /> Select room type
              </h2>
              <select
                value={selectedRoomType || ''}
                onChange={e => setSelectedRoomType(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-shadow shadow-md"
              >
                <option value="" disabled>Select a room type</option>
                {roomTypes.map(rt => (
                  <option key={rt.name} value={rt.name}>{rt.name}</option>
                ))}
              </select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-purple-400 flex items-center">
                <Palette size={22} className="mr-2" /> Choose Your Style
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTERIOR_STYLES.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 border-2 ${selectedStyle === style.name ? 'bg-pink-500 text-white border-pink-400 ring-pink-400 scale-105' : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-transparent focus:ring-purple-500'}`}
                  >
                    <img src={style.imgSrc} alt={style.name} className="w-16 h-12 object-cover rounded-md mb-1" />
                    <span className="text-xs sm:text-sm font-medium text-center whitespace-nowrap">{style.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateDesigns}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-purple-500 font-bold py-3 sm:py-3.5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg"
            >
              {isLoading ? (
                <>
                  <Wand2 size={20} className="mr-2 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} className="mr-2" /> Generate Designs
                </>
              )}
            </button>
          </aside>

          {/* Right Panel: Generated Designs */} 
          <section className="lg:col-span-9 bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-inner min-h-[300px] lg:min-h-0">
            {!uploadedImage && generatedDesigns.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <ImageIcon size={64} className="mb-4 opacity-50" />
                  <h3 className="text-2xl font-semibold mb-2">Your Design Canvas</h3>
                  <p className="max-w-md">Upload an image of your room or select a style on the left, then click "Generate Designs" to see the magic happen!</p>
              </div>
            )}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
                <p className="text-xl text-gray-300">Our AI is crafting your designs...</p>
                <p className="text-sm text-gray-400">This might take a moment.</p>
              </div>
            )}
            {!isLoading && generatedDesigns.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-pink-400 flex items-center">
                    <CheckCircle size={24} className="mr-2 text-green-500" /> Generated Masterpieces
                  </h2>
                  <div className="flex space-x-2">
                      <button className="p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center"><Download size={16} className="mr-1.5"/> Save All</button>
                      <button className="p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center"><Share2 size={16} className="mr-1.5"/> Share</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 pb-4">
                  {generatedDesigns.map((src, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg shadow-lg group relative aspect-video overflow-hidden flex items-center justify-center">
                      <img src={src} alt={`Generated Design ${index + 1}`} className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute bottom-2 right-2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="p-1.5 bg-black/50 hover:bg-black/70 rounded-md backdrop-blur-sm"><Download size={16}/></button>
                          <button className="p-1.5 bg-black/50 hover:bg-black/70 rounded-md backdrop-blur-sm" onClick={() => setPreviewImg(src)}><ImageIcon size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 放大图片模态框 */}
                {previewImg && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setPreviewImg(null)}>
                    <div className="relative max-w-3xl w-full p-4" onClick={e => e.stopPropagation()}>
                      <button className="absolute top-2 right-2 bg-black/70 rounded-full p-2 text-white hover:bg-black/90" onClick={() => setPreviewImg(null)}><X size={24}/></button>
                      <img src={previewImg} alt="Preview" className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DesignRoomPage; 