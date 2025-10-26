import React from 'react';

const Video = () => {
  const videos = [
    {
      id: 'T42yvwokgLw',
      title: 'Traditional Date Molasses Making',
      description:
        'Watch the authentic process of creating date molasses using traditional methods.',
    },
    {
      id: 'FfOLSvWVRMI',
      title: 'Date Syrup Production',
      description:
        'Learn how date syrup is commercially produced while maintaining quality and flavor.',
    },
    {
      id: 'LGc35X2h_c4',
      title: 'Homemade Date Molasses',
      description:
        'Simple steps to make your own date molasses at home with minimal equipment.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Discover Date Molasses
        </h2>
        <p className="text-gray-600 text-lg">
          Learn about the traditional process of making natural date molasses
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div key={video.id} className="flex flex-col">
            {/* Video Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Description */}
            <div className="mt-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {video.title}
              </h3>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
