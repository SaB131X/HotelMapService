import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '/src/assets/Logo.svg'
import { useTranslation } from 'react-i18next';
import './Header.css'


const Header = ({ onMapChange, currentMap }) => {
    const { t, i18n } = useTranslation();
    
    const toggleLanguage = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
    };
    const isMobile = window.innerWidth <= 768;
    const getCityName = (key) => {
        return isMobile ? t(`navigation.${key}_short`) : t(`navigation.${key}`);
    };
    // Функция для обработки клика по якорной ссылке
    const handleAnchorClick = (e, sectionId) => {
        e.preventDefault();
        
        // Если мы уже на главной странице
        if (window.location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState({}, '', `/#${sectionId}`);
            }
            if (onMapChange) {
                onMapChange(sectionId);
            }
        } else {
            window.location.href = `/#${sectionId}`;
        }
    };

    return (
        <header  className='header'>
            <div className='logo'>
                <button onClick={toggleLanguage} className='lang-btn'>
                    {i18n.language === 'ru' ? 'EN' : 'RU'}
                </button>
            </div>
            <nav className='nav'>
                <a 
                    className={`navLink ${currentMap === 'msk' ? 'active' : ''}`}
                    onClick={(e) => handleAnchorClick(e, 'msk')}
                >
                    {getCityName('Moscow')}
                </a>
                <a  
                    className={`navLink ${currentMap === 'spb' ? 'active' : ''}`}
                    onClick={(e) => handleAnchorClick(e, 'spb')}
                >
                    {getCityName('st-Petersburg')}
                </a>
                <a 
                    className={`navLink ${currentMap === 'nsk' ? 'active' : ''}`}
                    onClick={(e) => handleAnchorClick(e, 'nsk')}
                >
                    {getCityName('Novosibirsk')}
                </a>
            </nav>
            <div className='rightSection'>
                 <a
                    href="mailto:sea1024@gmail.com"
                    className='btnLink' 
                    //onClick={(e) => handleAnchorClick(e, 'cta')}
                >
                    {t('navigation.cta')}
                </a>
            </div>
        </header>
    );
};
export default Header;


