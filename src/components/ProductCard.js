import React from 'react';

const ProductCard = ({ product }) => {
  return (
    // Bọc ngoài bằng class col-3. 
    // Sư huynh có thể thêm 'col-md-3 col-sm-6' nếu muốn responsive trên màn hình nhỏ.
    <div  style={styles.colWrapper}>
      <div style={styles.card}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={styles.image} 
        />
        <div style={styles.info}>
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.price}>{product.price.toLocaleString('vi-VN')} VNĐ</p>
          <p style={styles.status}>{product.status}</p>
          <button style={styles.button}>Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  colWrapper: {
    padding: '10px', // Tạo khoảng cách (gutter) giữa các cột
    boxSizing: 'border-box'
  },
  card: {
    border: '1px solid #ddd',
    padding: '3px',
    borderRadius: '8px',
    width: '100%', // Chiếm toàn bộ không gian của col-3
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  image: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  info: {
    textAlign: 'center',
    width: '100%'
  },
  name: {
    fontSize: '18px',
    margin: '10px 0'
  },
  price: {
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: '5px 0'
  },
  status: {
    color: '#27ae60',
    fontSize: '14px',
    margin: '5px 0 15px 0'
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%'
  }
};

export default ProductCard;