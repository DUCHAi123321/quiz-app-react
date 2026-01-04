import lessIcon from '@/assets/icons/less-icon.png';
import less2Icon from '@/assets/icons/less2-icon.png';
import greaterIcon from '@/assets/icons/greater-icon.png';
import greater2Icon from '@/assets/icons/greater2-icon.png';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    
    for (let i = 1; i <= Math.min(totalPages, maxPagesToShow); i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={less2Icon} alt="First" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
        </button>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={lessIcon} alt="Previous" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
        </button>
        
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border border-blue-500 rounded-full ${
              currentPage === page
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-blue-50 text-blue-600'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={greaterIcon} alt="Next" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
        </button>
        <button 
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={greater2Icon} alt="Last" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
        </button>
      </div>

      <div className="text-sm text-gray-600">
        {startItem}-{endItem} of {totalItems}
      </div>
    </div>
  );
};

export default Pagination;
