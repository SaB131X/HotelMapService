
import Header from '../components/Header.jsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HomePage.css';

const MAPS_CONFIG = {
    msk: {
        id: 'map_msk',
        title: 'Москва',
        url: "https://makemap.2gis.ru/widget?data=eJy1l11zokgUhv8Le6k10x_0V6rmwsXEjyAjaiaSrblQQcRVsbBl1FT--56GJFq7e8fgjdgNeJ4-57z99quVZmGURWEnSreRzpLoYN399Wrp8z6y7qyHaKaPWWQ1rX2W7qNMF_Ov1iLdpBnM_4GIxEsC8zrRG_MEenT9g-cI5K5HcehI5Lb93P_2DW4Jo8MiS_Y6SXdw47Dbagw79_Gs29-8rFEy647Qojvg7lnRkC6OwfRlH3bkcbF7yufP6jKjLyuXaBJM-2g27bOb65U79VD4PNpHzw_LwXqznP-Q5ynR5zk8E3Y2S-_yhL3LgHiTxdkb9-Kw83B-IT_QcNxfBtvTar49JEPtJCbYo3JsFHT93HN-IRdJl9w3ho76NYwLiEtvF0Yn6w6jj89b04rLxTubpXlfuWGa7DTcv0hhgZPdTBcLS8UXW9kKqyZjXyRVSrKf8HwSwgsxvKnKwvfn_jZp-zvPxD99T0Lm59o5G56jhnH37_8m4ndAMUwpYSWURMr-hKK4GtTjxD8WIHE9gdtSUlQELqi65oKzirm4mHWHsIWvPQcjd-7nIdRTIGvCIFgQWWIwzsQniKy4_n3XgLB_FVJ9IAwpjsruIDax5QcIQVUzUgB8RYHr6xBAXLuuTpA2f-8ELtQ1flUx_q-j2HMayM0h_o4DSgW_O3-axECDsJ5n2FrHwf9J7e_ggqIS2GBxWwjCP7mIqFxgB6_TQsHaKNZHgQHnU2zGcg2MMKbHrdOgDeq8vq-JD0uFWQnIJPmUAlJVwfpiFGuHo6A9SpRJHEjCGK5NMoOu2SNxr907ITe1awETjCFRFiRhDF-5KjbUIyRMg7QFbSNttinEg9MiwHGup7EkFrisQEWZIleQqp2VQwd1HkxHrZTRateAnLxWbZ0ECl1oNZdSKvoJYtPqlVZKg8kIBwdmvhv1ZEMpUIGiqjAhtxBV9WBu9OyCgqFxYiYbpkW4yc76DBoArTSIa8qM4FjRYhNFSqGrxrFqEjBIqH8cgzNTxlG6hqtx5VoXc7kqWwm0vW00HvYqXk_1UWwrUUBiYdv2FbLqBjsshRyADsbquPlo7TkInFs8WEMy1081bbgMeIpK5IJg-yZrVXUhM0APRrAPutxpjS589xxemzYwgVnpHkAiFL_C8KraMBnFyjm9a4J94-MgO2AlJnVtq5QzWvg5kAsir6otqh4MihPaux9y1M0JJ0Zu18AKFFzMFgWQrXgwqav8wKfy0nnb4Lavhk-wt59NazvbD9NDUv7hq7WZaevO3MulYAQhqgQcnJrWxkwXLoSAU6QwwyUVEF6abiE4Ai-FwNPN5nkVRZuXYlRnx-jtH3lYxuM"
    },
    spb: {
        id: 'map_spb',
        title: 'Санкт-Петербург',
        url: 'URL_ДЛЯ_КАРТЫ_СПБ'
    },
    nsk: {
        id: 'map_nsk',
        title: 'Новосибирск',
        url: 'URL_ДЛЯ_КАРТЫ_НСК'
    }
};

const HomePage = () => {
    const { t } = useTranslation();
    const [currentMap, setCurrentMap] = useState('msk');
    const mapRef = useRef(null);

    const handleMapChange = (cityKey) => {
        setCurrentMap(cityKey);
        // Обновляем URL в iframe
        const iframe = document.getElementById('mapIframe');
        if (iframe) {
            iframe.src = MAPS_CONFIG[cityKey].url;
        }
    };

    // Эффект для обработки якорных ссылок
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (MAPS_CONFIG[hash]) {
                handleMapChange(hash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        
        // Проверяем хеш при загрузке
        const initialHash = window.location.hash.replace('#', '');
        if (MAPS_CONFIG[initialHash]) {
            handleMapChange(initialHash);
        }

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div>
            <Header onMapChange={handleMapChange} currentMap={currentMap} />
            
            <main className="main">
                <section id="map" className="map">
                    <div className="map-content">
                        <iframe 
                            id="mapIframe"
                            ref={mapRef}
                            frameBorder="1" 
                            width="100%" 
                            height="100%" 
                            src={MAPS_CONFIG[currentMap].url}
                            sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                            title={MAPS_CONFIG[currentMap].title}
                        />
                    </div>
                </section>
            </main>

        </div>
    );
};

export default HomePage;



