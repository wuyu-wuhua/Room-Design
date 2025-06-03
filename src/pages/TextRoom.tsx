import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DesignNavbar from '../components/DesignNavbar';
import { Image as ImageIcon, UploadCloud, FileText, Download, Share2, X, Wand2 } from 'lucide-react';
import { Home as HomeIcon, UserCircle, BarChart2, CreditCard, DollarSign, Cpu, LogOut } from 'lucide-react';

const TextRoom: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedImages([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
  });

  const handleGenerate = () => {
    if (!uploadedImage || !inputText.trim()) {
      alert('Please upload a picture and enter a description!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedImages([
        `https://picsum.photos/seed/textroom1-${Date.now()}/800/600`,
        `https://picsum.photos/seed/textroom2-${Date.now()}/800/600`,
        `https://picsum.photos/seed/textroom3-${Date.now()}/800/600`,
        `https://picsum.photos/seed/textroom4-${Date.now()}/800/600`,
      ]);
      setIsLoading(false);
    }, 2000);
  };

  // 下载单张图片
  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 下载所有图片
  const handleDownloadAll = () => {
    generatedImages.forEach(url => handleDownload(url));
  };

  const sidebarNav = [
    { name: 'Home', icon: <HomeIcon size={20} />, path: '/' },
    { name: 'Personal', icon: <UserCircle size={20} />, path: '/user-profile' },
    { name: 'Design Room', icon: <ImageIcon size={20} />, path: '/design-room' },
    { name: 'TextRoom', icon: <ImageIcon size={20} />, path: '/text-room' },
    { name: 'Statistics', icon: <BarChart2 size={20} />, path: '/statistics' },
    { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
    { name: 'Pricing', icon: <DollarSign size={20} />, path: '/pricing' },
    { name: 'API', icon: <Cpu size={20} />, path: '/api' },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col pt-20 md:pt-24">
      <DesignNavbar />
      <div className="flex w-full min-h-screen">
        {/* 侧边栏 */}
        <aside className="hidden md:flex flex-col items-center bg-[#181c23] w-20 py-8 space-y-5 min-h-screen shadow-2xl">
          {sidebarNav.map(item => (
            <a
              key={item.name}
              href={item.path}
              className="flex flex-col items-center justify-center text-white hover:text-blue-400 transition-colors duration-200 group"
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
          {/* 左侧：上传和输入 */}
          <aside className="lg:col-span-3 bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl flex flex-col space-y-6 h-fit lg:sticky lg:top-36">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-purple-400 flex items-center"><UploadCloud size={22} className="mr-2" />Upload Your Space</h2>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-colors hover:border-pink-500 hover:bg-gray-700/50 ${isDragActive ? 'border-pink-600 bg-pink-900/30' : 'border-gray-600'}`}
                style={{ width: 320, height: 320, margin: '0 auto' }}
              >
                <input {...getInputProps()} />
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain rounded-md shadow-md" style={{ maxWidth: 304, maxHeight: 304 }} />
                ) : (
                  <span className="text-gray-400 flex items-center justify-center w-full h-full" style={{ minHeight: 304 }}>Drag 'n' drop an image, or click to select</span>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3 text-purple-400 flex items-center"><FileText size={22} className="mr-2" />Enter description</h2>
              <textarea
                className="w-full rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-shadow shadow-md"
                placeholder="Please enter the style, elements, etc. description you want..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                style={{ height: 320, resize: 'none', fontSize: '1.1rem', padding: '1rem', maxWidth: '100%' }}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200 hover:from-blue-400 hover:to-purple-300 text-purple-500 font-bold py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-base sm:text-lg"
            >
              {isLoading ? (
                <>
                  <Wand2 size={20} className="mr-2 animate-spin" /> AI generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} className="mr-2" /> Generate renderings
                </>
              )}
            </button>
          </aside>
          <section className="lg:col-span-9 bg-gray-800/50 p-4 sm:p-6 rounded-xl shadow-inner min-h-[300px] lg:min-h-0">
            {!isLoading && generatedImages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <ImageIcon size={64} className="mb-4 opacity-50" />
                <h3 className="text-2xl font-semibold mb-2">Your Design Canvas</h3>
                <p className="max-w-md">Upload an image of your room or enter a description on the left, then click "Generate renderings" to see the magic happen!</p>
              </div>
            )}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
                <p className="text-xl text-gray-300">Our AI is crafting your designs...</p>
                <p className="text-sm text-gray-400">This might take a moment.</p>
              </div>
            )}
            {!isLoading && generatedImages.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-pink-400 flex items-center">
                    AI Generated Renderings
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center" onClick={handleDownloadAll}><Download size={16} className="mr-1.5"/> Save All</button>
                    <button className="p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center"><Share2 size={16} className="mr-1.5"/> Share</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 pb-4">
                  {generatedImages.map((src, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg shadow-lg group relative aspect-video overflow-hidden flex items-center justify-center">
                      <img src={src} alt={`Generated Design ${index + 1}`} className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute bottom-2 right-2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="p-1.5 bg-black/50 hover:bg-black/70 rounded-md backdrop-blur-sm" onClick={() => handleDownload(src)}><Download size={16}/></button>
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

export default TextRoom; 