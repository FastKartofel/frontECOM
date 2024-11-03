// src/components/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products.');
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul style={styles.list}>
                {products.map(product => (
                    <li key={product.id} style={styles.listItem}>
                        <Link to={`/products/${product.id}`} style={styles.link}>
                            {product.name} - ${product.price.toFixed(2)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        marginBottom: '10px',
    },
    link: {
        textDecoration: 'none',
        color: '#007BFF',
    },
};

export default ProductsPage;
