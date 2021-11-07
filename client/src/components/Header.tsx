import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header>
			<nav className="menu">
				<h1>
					<Link to="/" className="logo">
						OpenDrop
					</Link>
				</h1>
			</nav>
		</header>
	);
};

export default Header;
