import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
            <header className="app-header" >
                <div><h1>Mini Movie Manager</h1></div>
                <div><button type="button" className="theme-button" onClick={toggleTheme}
                    aria-label={darkMode ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}>
                    <span aria-hidden="true">{darkMode ? '☀' : '☾'}</span>
                    {darkMode ? 'Light' : 'Dark'}
                </button></div>
            </header>
    );
}

export default Header;
