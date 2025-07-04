// AIDEV-NOTE: Grid de itens minimalista com cards limpos e acessíveis
import { memo, createElement } from 'react';
import Image from '../common/Image';

const ItemGrid = memo(({ items, onSelectItem, onPinToggle }) => (
    <div className="min-item-grid">
        {/* ✅ Filtra itens sem chave única válida e cria chave única baseada em source+slug+title */}
        {items.filter(item => item && (item.id || item.slug || item.title)).map((item, index) => {
            // AIDEV-NOTE: Cria chave única para evitar duplicatas React
            const uniqueKey = item.source && item.slug ? 
                `${item.source}-${item.slug}` : 
                item.id || 
                `${item.title?.replace(/[^\w]/g, '')}-${index}`;
            
            return (
                <div 
                    key={uniqueKey}
                    className="min-item-card"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectItem(item);
                        }
                    }}
                >
                {/* AIDEV-NOTE: Botão de favoritar com acessibilidade */}
                {onPinToggle && !item.isStatic && (
                    <button
                        className={`min-item-pin-button ${item.pinned ? 'pinned' : ''}`}
                        aria-label={item.pinned ? 'Desafixar dos favoritos' : 'Fixar nos favoritos'}
                        title={item.pinned ? 'Desafixar dos favoritos' : 'Fixar nos favoritos'}
                        onClick={e => {
                            e.stopPropagation();
                            onPinToggle(item);
                        }}
                    >
                        {item.pinned ? '★' : '☆'}
                    </button>
                )}
                <div onClick={() => onSelectItem(item)}>
                    {/* AIDEV-NOTE: Renderiza ícone ou imagem com fallback */}
                    {item.iconComponent ? (
                        <div className="min-item-image flex items-center justify-center">
                            {createElement(item.iconComponent)}
                        </div>
                    ) : (
                        <Image
                            src={item.coverUrl || item.cover?.url}
                            alt={item.cover?.alt || item.title}
                            className="min-item-image"
                            errorSrc="https://placehold.co/300x450/1e293b/94a3b8?text=Capa"
                        />
                    )}
                    <div className="min-item-content">
                        <h3 className="min-item-title">{item.title}</h3>
                        {item.subtitle && <p className="min-item-subtitle">{item.subtitle}</p>}
                    </div>
                </div>
            </div>
            );
        })}
    </div>
));

ItemGrid.displayName = 'ItemGrid';

export default ItemGrid;
