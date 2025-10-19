import './css/PaginationControls.css'; // ← Import sem default

const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    totalElements,
    currentItemsCount,
    onPageChange 
}) => {
    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
        
        // Ajusta o início se estiver no final
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        // Botão para primeira página se necessário
        if (startPage > 0) {
            pageNumbers.push(0);
            if (startPage > 1) {
                pageNumbers.push('...');
            }
        }

        // Páginas principais
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        // Botão para última página se necessário
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages - 1);
        }

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="paginationContainer">
            {/* Informações da página */}
            {totalElements > 0 && (
                <div className="paginationInfo">
                    Mostrando {currentItemsCount} de {totalElements} pets - Página {currentPage + 1} de {totalPages}
                </div>
            )}

            {/* Controles de navegação */}
            <div className="paginationControls">
                <button
                    className="paginationButton"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Página anterior"
                >
                    ‹ Anterior
                </button>
                
                <div className="pageNumbers">
                    {pageNumbers.map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="ellipsis">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                className={`pageButton ${currentPage === page ? 'activePage' : ''}`}
                                onClick={() => onPageChange(page)}
                                aria-label={`Ir para página ${page + 1}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page + 1}
                            </button>
                        )
                    ))}
                </div>

                <button
                    className="paginationButton"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    aria-label="Próxima página"
                >
                    Próximo ›
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;