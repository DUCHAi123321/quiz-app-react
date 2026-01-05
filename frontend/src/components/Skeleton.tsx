export const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    {/* Image skeleton */}
    <div className="h-48 bg-gray-300"></div>
    
    {/* Content skeleton */}
    <div className="p-6 space-y-3">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      
      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* Meta info */}
      <div className="flex gap-4 pt-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      
      {/* Button */}
      <div className="h-10 bg-gray-300 rounded mt-4"></div>
    </div>
  </div>
);

export const SkeletonQuizCard = () => (
  <SkeletonCard />
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }, (_, index) => (
      <SkeletonCard key={`skeleton-card-${index}`} />
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
    {/* Table Header */}
    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
      <div className="flex gap-4">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
    
    {/* Table Rows */}
    {Array.from({ length: rows }, (_, index) => (
      <div key={`skeleton-row-${index}`} className="px-6 py-4 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonText = ({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string;
}) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    {Array.from({ length: lines }, (_, index) => (
      <div
        key={`skeleton-text-${index}`}
        className={`h-4 bg-gray-200 rounded ${
          index === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="flex items-center gap-4 animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-32"></div>
      <div className="h-3 bg-gray-200 rounded w-48"></div>
    </div>
  </div>
);

export const SkeletonForm = () => (
  <div className="space-y-4 animate-pulse">
    {/* Field 1 */}
    <div>
      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    
    {/* Field 2 */}
    <div>
      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    
    {/* Field 3 */}
    <div>
      <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
      <div className="h-24 bg-gray-200 rounded"></div>
    </div>
    
    {/* Button */}
    <div className="h-10 bg-gray-300 rounded w-32"></div>
  </div>
);

export const SkeletonPage = () => (
  <div className="space-y-6 animate-pulse p-6">
    {/* Page Title */}
    <div className="h-8 bg-gray-300 rounded w-64"></div>
    
    {/* Content */}
    <div className="space-y-4">
      <SkeletonText lines={5} />
      <SkeletonList count={6} />
    </div>
  </div>
);
